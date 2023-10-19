import { ethers } from "ethers";
import { FEEDBACK_FACTORY_CONTRACT_ADDRESS } from "./config";
import { abi } from "packages/form-XChange/artifacts/contracts/FeedbackFormFactory.sol/FeedbackFormFactory.json";
import { FeedbackFormFactory } from "packages/form-XChange/typechain";


const url = `https://linea-goerli.infura.io/v3/${process.env.INFURA_KEY}`;
//const url = "http://127.0.0.1:8545/"
const provider = new ethers.JsonRpcProvider(url);

console.log("infura network key : ", process.env.INFURA_KEY)

/**
 * This instance uses your infura key for direct node access.
 * Don't expose this in the client side to avoid server code contamination
 */
export const formContractServerInstance = new ethers.Contract(
  FEEDBACK_FACTORY_CONTRACT_ADDRESS,
  abi,
  provider
) as unknown as FeedbackFormFactory;
