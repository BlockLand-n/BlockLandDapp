// @ts-nocheck
"use client";
import React, { useState } from "react";
import { pinFileToIPFS, pinJSONToIPFS } from "../utils/pinata";
import { DataState } from "../provider";

const Page = () => {
  const { register_farm } = DataState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [plant, setPlant] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);


  const uploadMetadata = async () => {
    if (!name || !description || !uploadedFile || !location || !farmSize) {
      alert("All fields are required");
      return;
    }

    try {
      // Upload the file to Pinata
      const fileHash = await pinFileToIPFS(uploadedFile);
      // console.log("File Hash:", fileHash);

      // Create metadata JSON
      const metadata = {
        name,
        description,
        location,
        plant,
        farmSize,
        image: `https://gateway.pinata.cloud/ipfs/${fileHash}`,
      };

      // Upload metadata to Pinata
      const metadataCID = await pinJSONToIPFS(metadata);
      console.log("Metadata CID:", metadataCID);


    } catch (error) {
      console.error("Error uploading metadata:", error);
      alert("There was an error uploading the metadata. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadMetadata();
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
                        />
                      </label>
                    </div>
                  </div>
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
