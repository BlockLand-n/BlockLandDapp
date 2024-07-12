import React, { PropsWithChildren, ReactNode } from "react";
import { useContext } from "react";
import { DataContext } from "../context";

const DataProvider = ({ children }: PropsWithChildren<{}>) => {
  const address = "0x00";

  return (
    <DataContext.Provider
      value={{
        address,
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
