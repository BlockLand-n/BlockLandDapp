// @ts-nocheck
"use client";
import React, { useState,useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { retrievePublicKey } from "@/app/stellar/freighter";
import { typeConverter,contractInt } from "@/app/stellar/contract";
import toast from "react-hot-toast";

const page = () => {
  const [profit,setProfit] = useState("");
  const [farms, setFarms] = useState();
  const asset = typeConverter(
    "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    "address"
  );

  const distribute_profit = async (farm_id: Number, profit: Number) => {
    const address = await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "distribute_profit", [
        typeConverter(farm_id, "u128"),
        typeConverter(profit, "u128"),
        asset,
      ]);
      console.log(result);
      toast.success("Profit distributed among investors");
    }
  };



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
      <div className="dark:bg-[#191C24] w-full min-h-screen">
        <section className="min-h-screen pt-6">
          <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                <div>
                  <h5 className="mr-3 font-semibold dark:text-white">
                    Track Your Farms
                  </h5>
                  <p className="text-gray-500 dark:text-gray-400">
                    Manage all your existing farms or add a new one
                  </p>
                </div>
                <button
                  type="button"
                  className="flex gap-2 items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 border border-[#4af058]"
                >
                  Add Farm
                  <span className="text-2xl">
                    <CiSquarePlus />
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mt-6">

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Farm</th>
                            <th scope="col" className="px-4 py-3">Crop</th>
                            <th scope="col" className="px-4 py-3">Capital Raised</th>
                            <th scope="col" className="px-4 py-3">Profits</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Add Profit</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-gray-700">
                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <img className="w-[8rem]" src="/farm2.jpg" alt="" />
                                
                            </th>
                            <td className="px-4 py-3">sugarcane</td>
                            <td className="px-4 py-3">Apple</td>
                            <td className="px-4 py-3">300</td>
                            <td className="px-4 py-3">$2999</td>
                            <td className="flex gap-2 px-4 py-3">
                            <input
                type="text"
                id="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Amount In USDC"
                value={profit}
                onChange={(e)=>setProfit(e.target.value)}
            />

            <button
                type="submit"
                className="py-2 w-full px-4 bg-green-400 text-black rounded-md mt-2 sm:mt-0"
                onClick={()=>distribute_profit(1,parseInt(profit))}
            >
                Add Profit
            </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav> */}
        </div>
          </div>



        </section>
      </div>
    </>
  );
};

export default page;
