"use client";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { DataState } from "./provider";
import { useEffect, useState } from "react";
import { checkConnection, retrievePublicKey } from "./stellar/freighter";
import Link from "next/link";


export default function Home() {
  const { address, setAddress } = DataState();

  useEffect(() => {
    connect();
  }, [address]);

  const connect = async () => {
    
    if (await checkConnection()) {
      let publicKey = await retrievePublicKey();
      setAddress(publicKey);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-[#191C24]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          {/* <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Flowbite is out! See what's new</span> 
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </a> */}

          <img className="w-[15rem] m-auto" src="./blocklands3.png" alt="" />

          <h1 className="mb-4 mt-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {" "}
            <span className="text-[#4af058]">Farmland</span> Investing
            Simplified
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Empowering sustainable agriculture through decentralized,
            transparent, and profitable on-chain farming investments.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            {/* <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Learn more
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a> */}

            <Link className="inline-flex gap-2 items-center justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-[#4af058] dark:hover:bg-gray-700 dark:focus:ring-gray-800" href={"/onboarding"}> go to app
              <FaArrowRightLong /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
