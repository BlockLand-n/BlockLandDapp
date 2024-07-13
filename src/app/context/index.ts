import { createContext, Dispatch, SetStateAction } from "react";

type ContextType = {
  address: String | undefined;
  setAddress: (address: String | undefined) => Dispatch<SetStateAction<String | undefined>> | void;
  get_all_farms: () => void;
  get_farm: (id: Number) => void;
  register_farm: (meta:String,cap_req: Number,exp_pft: Number) => void;
  add_capital: (farm_id: Number, amount: Number) => void;
  distribute_profit: (farm_id: Number,profit: Number) => void;
  get_investments: () => void;
};

export const DataContext = createContext<ContextType>({} as ContextType);
