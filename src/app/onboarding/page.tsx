import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <section className="bg-white dark:bg-[#191C24] min-h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

        <h1 className="mb-4 mt-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          You Want To
        </h1>
        <div className="mt-12 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

          <div className="flex gap-2 items-center">
            <div className="w-[12rem] shadow-lg rounded-lg shadow dark:bg-gray-800 transform transition-transform hover:-translate-y-2">
              <Link href={"/register"}>
                <img
                  className="mt-4 rounded-t-lg w-[8rem] m-auto"
                  src="/raise.png"  
                  alt=""
                />
              </Link>
              <div className="p-5 text-center">
                <Link href={"/register"}>
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                    Raise Capital
                  </h5>
                </Link>
                {/* <p className="text-justify mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p> */}
              </div>
            </div>

          </div>


            <div className="flex gap-2 items-center">
            <div className="w-[12rem] shadow-lg rounded-lg shadow dark:bg-gray-800 transform transition-transform hover:-translate-y-2">
              <Link href={"/farms"}>
                <img
                  className="mt-4 rounded-t-lg w-[8rem] m-auto"
                  src="/invest.png"
                  alt=""
                />
              </Link>
              <div className="p-5 text-center">
                <Link href={"/farms"}>
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                    Invest In Farm
                  </h5>
                </Link>
                {/* <p className="text-justify mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
