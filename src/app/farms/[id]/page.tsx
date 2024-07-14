// @ts-nocheck
"use client";
import React, { useEffect,useState } from "react";

import { contractInt,typeConverter } from "@/app/stellar/contract";
import { retrievePublicKey } from "@/app/stellar/freighter";

const page = ({ params }) => {
  const id = params.id;
  const [farm,setFarm] = useState();

  useEffect(() => {
    get_farm();
  }, []);


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
      <section className="py-8 bg-white md:py-16 dark:bg-[#191C24] antialiased min-h-screen flex items-center">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-2xl mx-auto">
            <img className="w-[60rem] dark:block" src="/farm2.jpg" alt="Farm Image" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Fountain Creek Farm
            </h1>

            <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-2">
                Location: Springfield, IL
            </p>

            <p className="my-6 text-gray-500 dark:text-gray-400">
                Fountain Creek Farm is a beautiful and fertile farm located in Springfield, IL. The farm is known for its high-quality produce and sustainable farming practices. Invest in this farm to be a part of a thriving agricultural community.
            </p>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                <span className='text-md'>Total Expected Profits: </span> <span className='text-[#4af058]'> $1,249.99 </span>
                </p>

            </div>

            <div className="mt-6">
                <p className="text-gray-900 dark:text-white"><strong>Capital Required:</strong> $500,000</p>
                <p className="text-gray-900 dark:text-white"><strong>Capital Raised:</strong> $250,000</p>
                <p className="text-gray-900 dark:text-white"><strong>Total Duration:</strong> 18 months</p>
            </div>

            <h2 className='text-xl text-white mt-6 font-bold'>Invest In This Farm</h2>

            <div className="mt-4 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <input
                type="text"
                id="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Amount In USDC"
            />

            <button
                type="submit"
                className="py-2 w-full px-4 bg-green-400 text-black rounded-md mt-2 sm:mt-0"
            >
                Invest
            </button>

            </div>
          </div>
        </div>

  </section>


    </>
  );
};


export default page

