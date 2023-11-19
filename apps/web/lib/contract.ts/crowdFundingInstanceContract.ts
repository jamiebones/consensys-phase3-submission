import { ethers } from "ethers";
import { abi } from "packages/crowd-funding/artifacts/contracts/CrowdFundingContract.sol/CrowdFundingContract.json";
import { CrowdFundingContract } from "packages/crowd-funding/typechain";


type Args = {
  address: string;
  provider: ethers.JsonRpcProvider | ethers.BrowserProvider;
};

export const getCrowdFundingInstanceContract = ({
  address,
  provider,
}: Args) => {
  return new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as CrowdFundingContract;
};