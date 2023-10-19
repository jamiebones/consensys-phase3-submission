import { ethers } from "ethers";
import { abi } from "packages/form-XChange/artifacts/contracts/FeedbackForm.sol/FeedbackForm.json";
import { FeedbackForm } from "packages/form-XChange/typechain";

type Args = {
  address: string;
  provider: ethers.JsonRpcProvider | ethers.BrowserProvider;
};

export const getFeedbackFormInstanceContract = ({
  address,
  provider,
}: Args) => {
  return new ethers.Contract(
    address,
    abi,
    provider
  ) as unknown as FeedbackForm;
};