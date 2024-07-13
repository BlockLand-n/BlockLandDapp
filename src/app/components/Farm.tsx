import React from "react";
import { LiaMapMarkerAltSolid } from "react-icons/lia";


const Farm = () => {
  return (
    <div className="w-[19rem] mx-auto bg-[#191C24] rounded-xl overflow-hidden shadow-md border-2 border-gray-700">
      <a href="#">
        <img
          className="w-full h-48 object-cover"
          src="./farm.jpg"
          alt="Farm image"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-300">
            Fountain Creek Farm
          </h3>
          <div>
            <p className="text-gray-400 mt-1 text-sm flex items-center">
              {" "}
              <LiaMapMarkerAltSolid />
              Vermilion County, IL
            </p>
          </div>
          <div className="mt-6 text-gray-300">
            <div className="grid grid-cols-2 text-sm gap-2">
              <span>Realized IRR</span>
              <span className="font-bold text-right">17%</span>
              <span>Actual Hold Period</span>
              <span className="font-bold text-right">3.1 Years</span>
              <span>Target Hold Period</span>
              <span className="font-bold text-right">5-10 Years</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Farm;
