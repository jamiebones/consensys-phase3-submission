import { ethers } from "ethers";
import { FEEDBACK_FACTORY_CONTRACT_ADDRESS } from "./config";
import { abi } from "packages/form-XChange/artifacts/contracts/FeedbackForm.sol/FeedbackForm.json";
import { FeedbackFormFactory } from "packages/form-XChange/typechain";

/*
 * Relies on window.ethereum being present (metamask installed and client side). use condionally
 */
export const getFormContractClientInstance = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    console.log(window.ethereum);
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(
      FEEDBACK_FACTORY_CONTRACT_ADDRESS,
      abi,
      provider
    ) as unknown as FeedbackFormFactory;
  } else return null;
};
