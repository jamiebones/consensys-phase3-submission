import { ethers } from "ethers";
import { FUNDING_FACTORY_CONTRACT_ADDRESS, CROWDFUNDING_FACTORY_CONTRACT_ADDRESS, RPC_URL } from "./config";
import { abi as crowdFundingAbi } from "packages/crowd-funding/artifacts/contracts/CrowdFundingContract.sol/CrowdFundingContract.json";
import { abi as fundingFactoryAbi } from "packages/crowd-funding/artifacts/contracts/FundingFactory.sol/FundingFactory.json"
import { FundingFactory, CrowdFundingContract } from "packages/crowd-funding/typechain";


const url = `${RPC_URL}/${process.env.INFURA_KEY}`;
const provider = new ethers.JsonRpcProvider(url);

/**
 * This instance uses your infura key for direct node access.
 * Don't expose this in the client side to avoid server code contamination
 */
export const crowdFundingContractServerInstance = new ethers.Contract(
  CROWDFUNDING_FACTORY_CONTRACT_ADDRESS,
  crowdFundingAbi,
  provider
) as unknown as CrowdFundingContract;

export const fundingFactoryContractServerInstance = new ethers.Contract(
  FUNDING_FACTORY_CONTRACT_ADDRESS,
  fundingFactoryAbi,
  provider
) as unknown as FundingFactory;
