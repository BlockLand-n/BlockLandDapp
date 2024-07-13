import React, { PropsWithChildren, ReactNode, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context";
import { contractInt, typeConverter } from "../stellar/contract";

const DataProvider = ({ children }: PropsWithChildren<{}>) => {
  const [address, setAddress] = useState<String | undefined>();
  const asset = typeConverter("CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC","address");

  const register_farm = async (meta: String,cap_req: Number,exp_pft: Number) => {
    if(address !== undefined){
      let result:any = await contractInt(address, 'register_farm', [typeConverter(meta,"string"),typeConverter(cap_req,"u128"),typeConverter(exp_pft,"u128")]);
      console.log(result);
    }
  }

  const get_farm = async (id: Number) => {
    if(address !== undefined){
      let result:any = await contractInt(address, 'get_farm', [typeConverter(id,"u128")]);
      console.log(result);
    }
  }
  const distribute_profit = async (farm_id: Number,profit: Number) => {
    if(address !== undefined){
      let result:any = await contractInt(address, 'distribute_profit', [typeConverter(farm_id,"u128"),typeConverter(profit,"u128"),asset]);
      console.log(result);
    }
  }
  const add_capital = async (farm_id: Number, amount: Number) => {
    if(address !== undefined){
      let result:any = await contractInt(address, 'add_capital', [typeConverter(farm_id,"u128"),typeConverter(address.toString(),"address"),typeConverter(amount,"i128"),asset]);
      console.log(result);
    }
  }
  const get_investments = async () => {
    if(address !== undefined){
      let result:any = await contractInt(address, 'get_investments', [typeConverter(address.toString(),"address")]);
      console.log(result);
    }
  }
  const get_all_farms = async () => {
      if(address !== undefined){
        let result:any = await contractInt(address, 'get_all_farms', null);
        console.log(result);
      }
  }

  return (
    <DataContext.Provider
      value={{
        address,
        setAddress: setAddress,
        get_all_farms: get_all_farms,
        get_farm: get_farm,
        register_farm: register_farm,
        distribute_profit: distribute_profit,
        add_capital: add_capital,
        get_investments: get_investments
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const DataState = () => {
  return useContext(DataContext);
};

export default DataProvider;
