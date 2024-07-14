// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractInt, typeConverter } from "@/app/stellar/contract";
import { retrievePublicKey } from "@/app/stellar/freighter";
import toast from "react-hot-toast";

const Page = ({ params }) => {
  const id = params.id;
  const [farm, setFarm] = useState();
  const [usdc, setUsdc] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const asset = typeConverter(
    "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    "address"
  );

  useEffect(() => {
    getFarm(id);
  }, []);

  const getFarm = async (id: Number) => {
    const address = await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "get_farm", [
        typeConverter(id, "u128"),
      ]);
      const farmObject: any = {};
      for (let f of result._value) {
        const key = f._attributes.key._value.toString();
        if (Object.keys(f._attributes.val._value)[0] === "_attributes") {
          farmObject[key] = Number(f._attributes.val._value._attributes.lo._value);
        } else {
          farmObject[key] = f._attributes.val._value.toString();
        }
      }

      if (farmObject.metadata) {
        const metadataUrl = `https://azure-advisory-camel-563.mypinata.cloud/ipfs/${farmObject.metadata}`;
        try {
          const response = await axios.get(metadataUrl);
          farmObject.metadataContents = response.data;
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      }

      setFarm(farmObject);
      return farmObject;
    }
  };

  const addCapital = async (farmId: Number, amount: Number) => {
    const address = await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "add_capital", [
        typeConverter(farmId, "u128"),
        typeConverter(address.toString(), "address"),
        typeConverter(amount, "i128"),
        asset,
      ]);
      toast.success("Thanks for your investments");
      console.log(result);
    }
  };

  const invest = async () => {
    await addCapital(id, parseInt(usdc));
  };

  return (
    <>
      {farm && (
        <section className="py-8 bg-white md:py-16 dark:bg-[#191C24] antialiased min-h-screen flex items-center">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="">
              <div className="w-full">

                  <img
                    className="w-full h-96 object-cover dark:block rounded-md"
                    src={farm.metadataContents?.images[0]}
                    alt="Farm Image"
                  />
                

              </div>
              <div className="mt-6 sm:mt-8 lg:mt-8">
                <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl dark:text-white">
                  {farm.metadataContents?.name || "Farm Name"}
                </h1>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-2">
                  Location: {farm.metadataContents?.location || "Unknown Location"}
                </p>
                <p className="my-6 text-gray-500 dark:text-gray-400">
                  {farm.metadataContents?.description || "Farm Description"}
                </p>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    <span className="text-md">Total Expected Profits: </span>
                    <span className="text-[#4af058]"> ${farm.exp_pft} </span>
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-900 dark:text-white"><strong>Capital Required:</strong> {farm.cap_req}$</p>
                  <p className="text-gray-900 dark:text-white"><strong>Capital Raised:</strong> {farm.cap_rai}$</p>
                  <p className="text-gray-900 dark:text-white"><strong>Total Duration:</strong> 6 Months</p>
                </div>
                <h2 className="text-xl text-white mt-6 font-bold">Invest In This Farm</h2>
                <div className="mt-4 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <input
                    type="text"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Amount In USDC"
                    value={usdc}
                    onChange={(e) => setUsdc(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="py-2 w-full px-4 bg-green-500 text-black rounded-md mt-2 sm:mt-0"
                    onClick={invest}
                  >
                    Invest
                  </button>
                </div>
            
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
