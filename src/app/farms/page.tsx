// @ts-nocheck 
"use client";
import React, { useEffect, useState } from "react";
import Farm from "../components/Farm";
  import {
    contractInt,
    contractIntNoSign,
    typeConverter,
  } from "../stellar/contract";
  import { retrievePublicKey } from "../stellar/freighter";

const page = () => {
  const [farms, setFarms] = useState();

  useEffect(() => {
    get_all_farms();
  }, []);

  const get_all_farms = async () => {
    const address = await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "get_all_farms", null);

      const farmsArray: any[] = [];

      for (let farm of result._value) {
        const farmObject: any = {};
        for (let f of farm._value) {
          const key = f._attributes.key._value.toString();
          if (Object.keys(f._attributes.val._value)[0] === "_attributes") {
            farmObject[key] = Number(
              f._attributes.val._value._attributes.lo._value
            );
          } else {
            farmObject[key] = f._attributes.val._value.toString();
          }
        }
        farmsArray.push(farmObject);
      }
      console.log(farmsArray);
      setFarms(farmsArray);
      return farmsArray;
    }
  };

  return (
    <>
      <div className="bg-[#191C24] min-h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <h2 className="text-white text-4xl tracking-tight font-bold mb-6">
            Farms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {farms !== undefined &&  farms?.map((farm,index) => (
              <Farm key={index} farm={farm} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
