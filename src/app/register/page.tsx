// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { pinFileToIPFS, pinJSONToIPFS } from "../utils/pinata";
  import { contractInt,typeConverter } from "../stellar/contract";
  import { retrievePublicKey } from "../stellar/freighter";

const Page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [plant, setPlant] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [capitalRequired, setCapital] = useState("");
  const [profits, setProfits] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadField, setShowUploadField] = useState(true);


  const register_farm = async (
    meta: String,
    cap_req: Number,
    exp_pft: Number
  ) => {
    const address =  await retrievePublicKey();
    if (address !== undefined) {
      let result: any = await contractInt(address, "register_farm", [
        typeConverter(meta, "string"),
        typeConverter(cap_req, "u128"),
        typeConverter(exp_pft, "u128"),
      ]);
      console.log(result);
    }
  };

  const uploadMetadata = async () => {
    if (!name || !description || !uploadedFiles.length || !location || !farmSize) {
      alert("All fields are required");
      return;
    }
  
    try {
      // Upload each file to Pinata and get their hashes
      const fileHashes = await Promise.all(uploadedFiles.map(async (file) => {
        return await pinFileToIPFS(file);
      }));
  
      // Create metadata JSON
      const metadata = {
        name,
        description,
        location,
        plant,
        farmSize,
        images: fileHashes.map(hash => `https://gateway.pinata.cloud/ipfs/${hash}`), // Store each image URL in an array
      };
  
      // Upload metadata to Pinata
      const metadataCID = await pinJSONToIPFS(metadata);
      register_farm(metadataCID,parseInt(capitalRequired),parseInt(profits));
      console.log("Metadata CID:", metadataCID);
    } catch (error) {
      console.error("Error uploading metadata:", error);
      alert("There was an error uploading the metadata. Please try again.");
    }
  };
  

  useEffect(() => {
    console.log(expectedDate);
  }, [expectedDate])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    console.log(imageUrls);
    setUploadedFiles(files);
    setShowUploadField(false);
  };

  const handleRemoveImages = () => {
    setUploadedFiles([]);
    setShowUploadField(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadMetadata();
  };

  const handleDate = async (e) => {
  
    // Convert expectedDate to Unix timestamp
    // const expectedDateTimestamp = new Date(expectedDate).getTime() / 1000;
  
    setExpectedDate(e.target.value);
  };

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-[#191C24] antialiased min-h-screen flex items-center">
        <div
          id="updateProductModal"
          className="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-modal md:h-full flex"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <h2 className="text-white text-4xl tracking-tight font-bold mb-6">
              List Your Farmland
            </h2>

            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. Sugar Creek Farm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Crop/Fruit
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. "
                      value={plant}
                      onChange={(e) => setPlant(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. "
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="farmSize"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Farm Size (in acre)
                    </label>
                    <input
                      type="text"
                      id="farmSize"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. 50 Acre"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="capitalRequired"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Capital To Be Raised (in USDC)
                    </label>
                    <input
                      type="number"
                      id="capitalRequired"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. 10000"
                      value={capitalRequired}
                      onChange={(e) => setCapital(e.target.value)}
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="profits"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expected Profits
                    </label>
                    <input
                      type="number"
                      id="profits"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. 15000"
                      value={profits}
                      onChange={(e) => setProfits(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="expectedDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expected Harvest and Profit Distribution Date
                    </label>
                    <input
                      type="date"
                      id="expectedDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={expectedDate}
                      onChange={(e) => handleDate(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  {showUploadField ? (
  <div className="sm:col-span-2">
    <label
      htmlFor="upload"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Upload Images
    </label>
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="upload"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </label>
    </div>
  </div>
) : (
  <div className="sm:col-span-2">
    <div className="flex justify-end mb-2">
      <button
        type="button"
        className="text-red-500"
        onClick={handleRemoveImages}
      >
        Remove Images
      </button>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      {uploadedFiles.map((file, index) => (
        <div key={index} className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt={`upload-${index}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  </div>
)}

                </div>

                <button
                  type="submit"
                  className="mt-4 py-1 w-full px-4 bg-green-400 text-black rounded-md"
                >
                  List
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
