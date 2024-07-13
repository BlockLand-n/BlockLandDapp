
const key = "afcc60b9900b7256a0d9";
const secret = "f0e45615a827ee15b1845bb9e49adf2731ba2a4a21517f0348c9818b0a8636f9";
const FormData = require('form-data');


const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody: any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response: { data: { IpfsHash: string; }; }) {
           return response.data.IpfsHash;
        })
        .catch(function (error: { message: any; }) {
            console.log(error)
            // return {
            //     success: false,
            //     message: error.message,
            // }

    });
};


export const pinFileToIPFS = async (file:any) => {
    try {

        const formData = new FormData();
        formData.append("file", file);
    
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': key,
            'pinata_secret_api_key': secret,
            "Content-Type": "multipart/form-data"
          },
        });
    
        return resFile.data.IpfsHash;
    } catch (err) {
        console.log(err);
    }
}

export {}