import type { NextPage } from "next/types";
import Layout from "../../components/Layout";
import { ethers } from "ethers";
import { fundingFactoryContractServerInstance } from "apps/web/lib/contract.ts/contract.server";
import { getCrowdFundingInstanceContract } from "apps/web/lib/contract.ts/crowdFundingInstanceContract";

import { RPC_URL } from "../../lib/contract.ts/config";
import { readFileFromRemoteServer } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useNetwork } from "apps/web/hooks/useNetwork";
import { abi } from "packages/crowd-funding/artifacts/contracts/CrowdFundingContract.sol/CrowdFundingContract.json";
import { CrowdFundingContract } from "packages/crowd-funding/typechain";

type Props = {
  address: string;
  owner: string;
  purpose: string;
  amount: string;
  campaignDuration: string;
  reason: string;
  numberOfDonors: string;
  amountDonated: string;
};

const CrowdFundingDetails: NextPage<Props> = ({
  address,
  owner,
  purpose,
  amount,
  campaignDuration,
  reason,
  numberOfDonors,
  amountDonated
}) => {
  const {
    state: { isConnected, wallet },
  } = useNetwork();

  const [contract, setContract] = useState<CrowdFundingContract | null>(null);
  const [donatedAmount, setDonatedAmount] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);

  const getFundingContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      address,
      abi,
      signer
    ) as unknown as CrowdFundingContract;
    setContract(contract);
  };

  useEffect(() => {
    if (contract == null && address !== null) {
      getFundingContract();
    }
  });

  const handleDonationChange = (e: any) => {
    if (e.target.value !== "") {
      setDonatedAmount(e.target.value);
    }
  };

  const makeDonation = async () => {
    if (donatedAmount !== 0 && contract) {
      try {
        setProcessing(true);
        const amountToDonate = ethers.parseEther(donatedAmount.toString());
        console.log("donated amount ", amountToDonate, donatedAmount)
        return;
        await contract.makeDonation({ value: amountToDonate });
      } catch (error) {
        console.log("There was an error => ", error);
      } finally {
        setProcessing(false);
        setDonatedAmount(0);
      }
    }
  };

  if ( processing ){
    return (
        <Layout>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-center">
              Processing your donation to the contract......
            </h1>
          </div>
        </Layout>
      );
  }

  return (
    <Layout>
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">
          Crowd Funding For : <span>{purpose}</span>
        </h1>
        <p className="text-center text-xl mt-4">{wallet}</p>
      </div>

      <div className="mb-4">
        <span className="font-bold">Reason:</span>
        <p className="mt-2">{reason && JSON.parse(reason)}</p>
      </div>

      <div className="mb-4 flex border p-2 w-1/2">
        <span className="font-bold">Contract Owner:</span>
        <p className="ml-2">{owner}</p>
      </div>

      <div className="mb-4 flex border p-2 w-1/2">
        <span className="font-bold">Target Amount:</span>
        <p className="ml-2">{+amount / 1e18} Ether</p>
      </div>

      <div className="flex border p-2 w-1/2">
        <span className="font-bold">Campaign Duration:</span>
        <p className="ml-2">
          {campaignDuration && new Date(+campaignDuration).toDateString()}
        </p>
      </div>

      <div className="flex border p-2 w-1/2">
        <span className="font-bold">Number of Donors:</span>
        <p className="ml-2">{numberOfDonors.toString()}</p>
      </div>

      <div className="flex border p-2 w-1/2">
        <span className="font-bold">Amount Donated:</span>
        <p className="ml-2">{+amountDonated.toString() / 1e18}</p>
      </div>

      {owner.toLowerCase() == wallet?.toLowerCase() && (
        <div>
          <p>Create Milestone</p>
        </div>
      )}

      <div className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4 w-1/2">
        <h2 className="text-center mb-2">Donate </h2>
        <div className="flex items-center mb-2">
          <input
            type="number"
            value={donatedAmount}
            className="border p-2 mr-2"
            placeholder="0"
            onChange={handleDonationChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={makeDonation}
            disabled={processing}
          >
            Donate
          </button>
        </div>

        <p>Donate to the cause by sending Ether to this contract</p>
      </div>

      {!isConnected && (
        <p className="text-center text-sm mt-4">
          In order to donate, pleese connect your wallet
        </p>
      )}

      <div className="flex w-full justify-center space-x-8"></div>
    </Layout>
  );
};

export default CrowdFundingDetails;

export const getServerSideProps = async (context) => {
  const { params } = context;

  //const url = `https://linea-goerli.infura.io/v3/${process.env.INFURA_KEY}`;
  const url = `${RPC_URL}/${process.env.INFURA_KEY}`;
  const provider = new ethers.JsonRpcProvider(url);

  const crowdFundingContract = getCrowdFundingInstanceContract({
    address: params?.address,
    provider,
  });

  const [fundingCID, purpose, amount, campaignDuration, owner, numberOfDonors, amountDonated] =
    await Promise.all([
      crowdFundingContract.fundingCId(),
      crowdFundingContract.purpose(),
      crowdFundingContract.targetAmount(),
      crowdFundingContract.campaignDuration(),
      crowdFundingContract.campaignOwner(),
      crowdFundingContract.numberOfDonors(),
      crowdFundingContract.getDonation()
    ]);

  const fileData = await readFileFromRemoteServer(
    `https://devnet.irys.xyz/${fundingCID}`
  );
  console.log("file data", fileData);


  return {
    props: {
      address: params?.address,
      owner,
      purpose,
      amount: amount.toString(),
      campaignDuration: campaignDuration.toString(),
      reason: fileData,
      numberOfDonors: numberOfDonors.toString(),
      amountDonated: amountDonated.toString()
    },
    //revalidate: 10,
  };
};
