"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DataProvider, { DataState } from "./provider";
import { retrievePublicKey, checkConnection } from "./stellar/freighter";
import { SetStateAction, useEffect, useState } from "react";
import React from "react";
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [address,setAddress] = useState<String | undefined>();

  useEffect(()=>{
    connect();
  },[address])

  const connect = async () => {
    if (await checkConnection()) {
      let publicKey = await retrievePublicKey();
      setAddress(publicKey);
      
    }
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <DataProvider>
        <body className="dark">
          <Toaster position="bottom-center"
                   reverseOrder={false}
                   toastOptions={{
                    duration: 5000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                   />
          <nav className="bg-[#191C24] border-gray-200 border-b border-green-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="/blocklands3.png"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  BlockLand
                </span>
              </a>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-[#191C24]  dark:border-gray-700">
                  {/* <li>
          <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-[#4af058]" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 md:dark:hover:text-green-600[#4af058] dark:hover:bg-gray-700 dark:hover:text-[#4af058] md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 md:dark:hover:text-green-600[#4af058] dark:hover:bg-gray-700 dark:hover:text-[#4af058] md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 md:dark:hover:text-green-600[#4af058] dark:hover:bg-gray-700 dark:hover:text-[#4af058] md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 md:dark:hover:text-green-600[#4af058] dark:hover:bg-gray-700 dark:hover:text-[#4af058] md:dark:hover:bg-transparent">Contact</a>
        </li> */}

                  <button
                    onClick={connect}
                    className="py-2 px-4 rounded-md border text-white border-[#4af058]"
                  >
                    {address !== undefined ? address.slice(0, 3)+"...."+address.slice(-2) : "connect wallet"}
                  </button>
                </ul>
              </div>
            </div>
          </nav>

          {children}
        </body>
      </DataProvider>
    </html>
  );
}
