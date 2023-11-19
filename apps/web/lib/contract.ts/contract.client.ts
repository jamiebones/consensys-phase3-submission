import { ethers } from "ethers";
import { FUNDING_FACTORY_CONTRACT_ADDRESS, CROWDFUNDING_FACTORY_CONTRACT_ADDRESS } from "./config";
import { abi as crowdFundingAbi } from "packages/crowd-funding/artifacts/contracts/CrowdFundingContract.sol/CrowdFundingContract.json";
import { abi as fundingFactoryAbi } from "packages/crowd-funding/artifacts/contracts/FundingFactory.sol/FundingFactory.json"
import { FundingFactory, CrowdFundingContract } from "packages/crowd-funding/typechain";

/*
 * Relies on window.ethereum being present (metamask installed and client side). use condionally
 */
export const getCrowdFundingContractClientInstance = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    console.log(window.ethereum);
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(
      CROWDFUNDING_FACTORY_CONTRACT_ADDRESS,
      crowdFundingAbi,
      provider
    ) as unknown as CrowdFundingContract;
  } else return null;
};

export const getFundingFactoryContractClientInstance = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    console.log(window.ethereum);
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(
      FUNDING_FACTORY_CONTRACT_ADDRESS,
      fundingFactoryAbi,
      provider
    ) as unknown as FundingFactory;
  } else return null;
};
