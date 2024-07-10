import React from "react";

const page = () => {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

        <h1 className="mb-4 mt-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          You Want To
        </h1>
        <div className="mt-12 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

          <div className="flex gap-2 items-center">
            <div className="max-w-sm shadow-lg rounded-lg shadow dark:bg-gray-800 transform transition-transform hover:-translate-y-2">
              <a href="#">
                <img
                  className="mt-4 rounded-t-lg w-[8rem] m-auto"
                  src="/raise.png"
                  alt=""
                />
              </a>
              <div className="p-5 text-left">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Raise Capital
                  </h5>
                </a>
                {/* <p className="text-justify mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p> */}
              </div>
            </div>

          </div>


            <div className="flex gap-2 items-center">
            <div className="max-w-sm shadow-lg rounded-lg shadow dark:bg-gray-800 transform transition-transform hover:-translate-y-2">
              <a href="#">
                <img
                  className="mt-4 rounded-t-lg w-[8rem] m-auto"
                  src="/invest.png"
                  alt=""
                />
              </a>
              <div className="p-5 text-left">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Invest In Farm
                  </h5>
                </a>
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
