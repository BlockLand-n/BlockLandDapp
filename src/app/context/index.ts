import { createContext } from "react";

type ContextType = {
  address: String;
};

export const DataContext = createContext<ContextType>({} as ContextType);
