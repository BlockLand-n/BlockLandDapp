// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { retrievePublicKey } from "@/app/stellar/freighter";
import { contractInt, typeConverter } from "@/app/stellar/contract";

const page = () => {
  const [invests, setInvest] = useState();

  useEffect(() => {
    get_investments();
  }, []);

  const get_investments = async () => {
    const address = await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "get_investments", [
        typeConverter(address.toString(), "address"),
      ]);
      const map = new Map();
      for (let f of result._value) {
        map.set(
          Number(f._attributes.key._value._attributes.lo._value),
          Number(f._attributes.val._value._attributes.lo._value)
        );
      }
      console.log(map);
      setInvest(map);

      const invests = [];

      for (let [key, value] of map.entries()) {
        const farm = await get_farm(key);
        invests.push({ key, value, farm });
      }

      console.log(invests);
      setInvest(invests);
      return invests;
    }
  };

  const get_farm = async (id: Number) => {
    const address = await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "get_farm", [
        typeConverter(id, "u128"),
      ]);
      const farm: any[] = [];
      for (let f of result._value) {
        const key = f._attributes.key._value.toString();
        if (Object.keys(f._attributes.val._value)[0] === "_attributes") {
          farm[key] = Number(f._attributes.val._value._attributes.lo._value);
        } else {
          farm[key] = f._attributes.val._value.toString();
        }
      }
      console.log(farm);

      setFarm(farm);
      return farm;
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
                      <th scope="col" className="px-4 py-3">
                        Farm
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Crop
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Invested
                      </th>
                      <th scope="col" className="px-4 py-3">
                        P&L
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Sugar Cane Farm
                      </th>
                      <td className="px-4 py-3">sugarcane</td>
                      <td className="px-4 py-3">Apple</td>
                      <td className="px-4 py-3">300</td>
                      <td className="px-4 py-3">$2999</td>
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
