import { ChangeEvent, useState, useEffect } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { H1 } from "../components/Text";
import { EventLog, ethers } from "ethers";
import { abi } from "packages/crowd-funding/artifacts/contracts/FundingFactory.sol/FundingFactory.json";
import { useNetwork } from "../hooks/useNetwork";
import { useRouter } from "next/router";
import {
  CROWDFUNDING_FACTORY_CONTRACT_ADDRESS,
  FUNDING_FACTORY_CONTRACT_ADDRESS,
  RPC_URL,
} from "../lib/contract.ts/config";
import {
  FundingFactory,
} from "packages/crowd-funding/typechain";
import DatePicker from "react-datepicker";
import { convertToDecimal } from "../utils/utils";
import "react-datepicker/dist/react-datepicker.css";

const classMap = {
  textAreaClass:
    "w-full mt-6 border rounded-md py-2 px-4 placeholder-gray-400 placeholder-opacity-50 h-40",
  inputClasses:
    "w-full mt-6 border rounded-md py-2 px-4 placeholder-gray-400 placeholder-opacity-50",
  labelClasses: "text-primary-black font-medium text-lg",
};

const rpcProvider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/YOUR_INFURA_ID"
);

interface logsEvent {
  topics: string[];
  data: string;
}

export default function CreateNewCrowdFuningContract() {
  const [amountToRaise, setAmountToRaise] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>("");
  const [remainCharacter, setRemainCharacter] = useState<number>(200);
  const [endDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<FundingFactory | null>(null);
  const { state } = useNetwork();
  const router = useRouter();

  const getContractFactory = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      FUNDING_FACTORY_CONTRACT_ADDRESS,
      abi,
      signer
    ) as unknown as FundingFactory;
    setContract(contract);
  };

  useEffect(() => {
    if (contract == null) {
      getContractFactory();
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "amountToRaise" && e.target.value !== null) {
      setAmountToRaise(+e.target.value);
    } else if (name === "purpose") {
      //get the length of the word
      let wordCount = +e.target.value.length;
      if (+wordCount <= 200) {
        setPurpose(e.target.value);
        setRemainCharacter(200 - +wordCount);
      }
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== null) {
      setDescription(e.target.value);
    }
  };

  const handleDescriptionUpload = async (description: string) => {
    const res = await fetch("/api/upload-description", {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        description: description,
      }),
    });

    return await res.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !amountToRaise || !purpose) return;
    const confirmDetails = confirm(
      `Purpose for raising funds: ${purpose}
      Description: ${description} 
        Amount Sought: ${amountToRaise.toString()}
        Last Donation Date: ${endDate}
        `
    );
    if (!confirmDetails) return;
    try {
      if (contract && state.isConnected) {
        setLoading(true);
        const transactionId = await handleDescriptionUpload(description);
        const amount = ethers.parseEther(amountToRaise.toString());
        const timestamp = new Date(endDate).getTime();
        const tx = await contract.createCrowdFundingContract(
          transactionId,
          purpose,
          amount,
          timestamp,
          { value: ethers.parseEther("0.001") }
        );
        const receipt = await tx.wait(1);
        console.log("receipt => ", receipt)
        let filter = contract.filters.NewCrowdFundingCreated;
        let events = await contract.queryFilter(filter, receipt?.blockNumber);
        console.log("events => ", events);
        const event = events[0];
        const args = event.args;
        const contractAddress = args.cloneAddress;
        console.log("Events => ", event);
        setLoading(false);
        setDescription("");
        setAmountToRaise(0);
        router.push(`/contract/${contractAddress}`);
      }
    } catch (error) {
      console.log("Error creating crowd funding contract => ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">
            Creating New Crowd Funding Contract...
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <H1 className="mt-20 text-center">Create new crowd funding contract</H1>
      <main className="mt-12">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5 md:gap-10 place-items-end px-12 py-7 shadow-lg rounded-xl bg-[#FEFEFE] max-w-4xl mx-auto mb-10"
        >
          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label className={classMap.labelClasses} htmlFor="form_title">
                Purpose
              </label>
              <input
                type="text"
                className={classMap.inputClasses}
                required
                value={purpose}
                placeholder="Fund raiser purpose"
                name="purpose"
                onChange={(e) => handleChange(e)}
              />
              <span>Maximum letters : {remainCharacter}</span>
            </div>
          </div>

          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label className={classMap.labelClasses} htmlFor="form_title">
                Description
              </label>
              <textarea
                className={classMap.textAreaClass}
                required
                value={description}
                placeholder="Description on the fund raising purpose"
                name="description"
                onChange={(e) => handleDescriptionChange(e)}
              />
            </div>
          </div>

          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label className={classMap.labelClasses} htmlFor="form_title">
                Last date for donation
              </label>
              <DatePicker
                className={classMap.inputClasses}
                selected={endDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label className={classMap.labelClasses} htmlFor="form_title">
                Amount to raise ( Ether )
              </label>
              <input
                type="number"
                className={classMap.inputClasses}
                required
                value={amountToRaise}
                placeholder="Amount in ETH"
                name="amountToRaise"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mx-auto md:mx-0 py-2 md:max-w-[200px]"
          >
            Create Crowd Funding Contract
          </Button>
        </form>
      </main>
    </Layout>
  );
}
