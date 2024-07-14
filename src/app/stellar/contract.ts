import {
    Contract, SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal, Address
} from "@stellar/stellar-sdk";
import { userSignTransaction } from './freighter';
import { getPublicKey } from '@stellar/freighter-api';


let rpcUrl = "https://soroban-testnet.stellar.org";
let contractAddress = 'CD5QGTZWEZH5A2YNPI2DAYSLLPVW2MPQYMSGMPMXPVQZ627GHQ6DMAXO';



let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
}


const typeConverter = (value:String | Number,type: String ) => {
    return nativeToScVal(value, { type: type })
}


async function contractInt(caller: string, functName: string, values: any) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(caller);
    let buildTx;
    if (values == null) {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30).build();
    }
    else {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30).build();
    }
    let _buildTx = await provider.prepareTransaction(buildTx);
    let prepareTx = _buildTx.toXDR();
    let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);
    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });
        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }
        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (txResponse.status === "SUCCESS") {
                let result = txResponse.returnValue;
                return result;
            }
        }
    } catch (err) {
        return err;
    }
}

async function contractIntNoSign(caller: string, functName: string, values: any) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(caller);

    let buildTx;
    if (values == null) {
        buildTx = new TransactionBuilder(sourceAccount, params)
            .addOperation(contract.call(functName))
            .setTimeout(30).build();
    } else {
        buildTx = new TransactionBuilder(sourceAccount, params)
            .addOperation(contract.call(functName, ...values))
            .setTimeout(30).build();
    }

    // Prepare the transaction without signing
    let _buildTx = await provider.prepareTransaction(buildTx);
    let prepareTx = _buildTx.toXDR();

    // No signing step
    let tx = TransactionBuilder.fromXDR(prepareTx, Networks.TESTNET);

    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });

        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }

        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            if (txResponse.status === "SUCCESS") {
                let result = txResponse.returnValue;
                return result;
            }
        }
    } catch (err) {
        return err;
    }
}



export { contractInt,typeConverter,contractIntNoSign };