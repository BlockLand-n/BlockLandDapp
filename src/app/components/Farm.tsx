// @ts-nocheck 
import Link from "next/link";
import React, { useEffect } from "react";
import { LiaMapMarkerAltSolid } from "react-icons/lia";

const Farm = ({ farm }) => {
  useEffect(() => {
    console.log(farm)
  }, [])
  return (
    <div className="w-[19rem] mx-auto bg-[#191C24] rounded-xl overflow-hidden shadow-md border-2 border-gray-700">
      <Link href={`/farms/${farm.id}`}>
        <img
          className="w-full h-48 object-cover"
          src={farm.metadataContents.images[0]}
          alt="Farm image"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-300">
            {farm.metadataContents.name}
          </h3>
          <div>
            <p className="text-gray-400 mt-1 text-sm flex items-center">
              {" "}
              <LiaMapMarkerAltSolid />
            {farm.metadataContents.location}
              
            </p>
          </div>
          <div className="mt-6 text-gray-300">
            <div className="grid grid-cols-2 text-sm gap-2">
              <span>Capital Required</span>
              <span className="font-bold text-right">{farm.cap_req}</span>
              <span>Capital Raised</span>
              <span className="font-bold text-right">{farm.cap_rai}</span>
              <span>Expected Profit</span>
              <span className="font-bold text-right">{farm.exp_pft}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Farm;
