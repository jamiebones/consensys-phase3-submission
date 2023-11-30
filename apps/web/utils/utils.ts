import Irys from "@irys/sdk";

const https = require("https");
const { Private_Key } = process.env;

export const getIrysClient = () => {
    const irys = new Irys({
        url: "https://devnet.irys.xyz",
        token: "matic",
        key: Private_Key,
        config: {
            providerUrl: "https://rpc-mumbai.maticvigil.com",
        }
    });
    // Print your wallet address
    console.log(`wallet address = ${irys.address}`);
    return irys;
};

export const lazyFundNode = async (size: number) => {
    const irys = getIrysClient();
    const price = await irys.getPrice(size);
    await irys.fund(price);
};


export const uploadData = async (dataToUpload: string) => {
	const irys = getIrysClient();
	try { 
        const size = Buffer.byteLength(JSON.stringify(dataToUpload))
        console.log("funding transaction of size => ", size)
        await lazyFundNode(size);
        const data = Buffer.from(JSON.stringify(dataToUpload));
        const tags = [{name: "Content-Type", value: "text/plain"}];
		const receipt = await irys.upload(data, { tags });
		console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
        return receipt.id;
	} catch (e) {
		console.log("Error uploading data ", e);
	}
};

export const readFileFromRemoteServer = async function (remoteFileUrl: string) {
    return new Promise((resolve, reject) => {
      https
        .get(remoteFileUrl, (response) => {
          let data = "";
          // A chunk of data has been received.
          response.on("data", (chunk) => {
            data += chunk;
          });
  
          // The whole response has been received.
          response.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (error) => {
          reject(`Error: ${error.message}`);
        });
    });
  }

  export function convertToDecimal(scientificNotation: number) {
    const [coefficient, exponent] = scientificNotation.toString().split('e');
    // Convert the coefficient to a decimal number
    const decimalCoefficient = parseFloat(coefficient);
    // Calculate the result by multiplying the coefficient with 10 raised to the exponent
    const result = decimalCoefficient * Math.pow(10, parseInt(exponent, 10));
  
    return result;
  }