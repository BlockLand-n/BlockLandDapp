import {
  requestAccess,
  signTransaction,
  setAllowed,
} from "@stellar/freighter-api";

async function checkConnection() {
  const isAllowed = await setAllowed();
  if (isAllowed) {
    return true;
  }
}

const retrievePublicKey = async () => {
  let publicKey = "";
  let error = "";
  try {
    publicKey = await requestAccess();
  } catch (e) {
    console.log(e);
  }
  if (error) {
    return error;
  }
  return publicKey;
};

const userSignTransaction = async (
  xdr: string,
  network: any,
  signWith: any
) => {
  let signedTransaction = "";
  let error = "";
  try {
    signedTransaction = await signTransaction(xdr, {
      network,
      accountToSign: signWith,
    });
  } catch (e) {
    console.log(e);
  }
  if (error) {
    return error;
  }
  return signedTransaction;
};

export { retrievePublicKey, checkConnection, userSignTransaction };
