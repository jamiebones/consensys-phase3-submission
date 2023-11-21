import type { NextPage } from "next/types";
import Layout from "../../components/Layout";
import { ethers } from "ethers";
import { fundingFactoryContractServerInstance } from "apps/web/lib/contract.ts/contract.server";
import { getCrowdFundingInstanceContract } from "apps/web/lib/contract.ts/crowdFundingInstanceContract";

import { RPC_URL } from "../../lib/contract.ts/config";
import { readFileFromRemoteServer } from "../../utils/utils";
import React, { useEffect, useState } from "react";
import { useNetwork } from "apps/web/hooks/useNetwork";
import { abi } from "packages/crowd-funding/artifacts/contracts/CrowdFundingContract.sol/CrowdFundingContract.json";
import { CrowdFundingContract } from "packages/crowd-funding/typechain";
import MileStoneModal from "apps/web/components/MileStoneModal";

const etherConstant = 1_000_000_000_000_000_000;

const milestoneStatus = ["Approved", "Declined", "Pending"];


type Props = {
  address: string;
  owner: string;
  purpose: string;
  amount: string;
  campaignDuration: string;
  reason: string;
  numberOfDonors: string;
  amountDonated: string;
  milestone: MilestoneProps;
};

type MilestoneVoteProps = {
  address: string;
  vote: boolean;
};

type MilestoneProps = {
  milestoneReason: string;
  approved: boolean;
  votingPeriod: string;
  status: string;
  votes: MilestoneVoteProps[];
};

const CrowdFundingDetails: NextPage<Props> = ({
  address,
  owner,
  purpose,
  amount,
  campaignDuration,
  reason,
  numberOfDonors,
  amountDonated,
  milestone,
}) => {
  const {
    state: { isConnected, wallet },
  } = useNetwork();

  const [contract, setContract] = useState<CrowdFundingContract | null>(null);
  const [donatedAmount, setDonatedAmount] = useState<number>(0);
  const [myDonation, setMyDonation] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [voting, setVoting] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);


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

  const getDonationMade = async () => {
    const myDonation = await contract?.donationGiven();
    const dona = myDonation ? +myDonation.toString() : 0;
    setMyDonation(dona);
  };

  useEffect(() => {
    if (contract) {
      getDonationMade();
    }
  }, [contract]);

  const handleDonationChange = (e: any) => {
    if (e.target.value !== "") {
      setDonatedAmount(e.target.value);
    }
  };

  const makeDonation = async () => {
    if (donatedAmount !== 0 && contract) {
      try {
        setProcessing(true);

        let amount = ethers.parseEther(donatedAmount.toString());
        console.log("donated amount ", amount, donatedAmount);
        await contract.makeDonation({ value: amount });
      } catch (error) {
        console.log("There was an error => ", error);
      } finally {
        setProcessing(false);
        setDonatedAmount(0);
      }
    }
  };

  const handleVoteOnMilestone = async (vote: boolean) => {
    if (contract) {
      try {
        setVoting(true);
        const tx = await contract.voteOnMilestone(vote);
        tx.wait(2);
      } catch (error) {
        console.log("There was an error voting => ", error);
      } finally {
        setVoting(false);
      }
    }
  };

  const withdrawMilestoneDonation = async () => {
    if (contract) {
      try {
        setProcessing(true);
        await contract.withdrawMilestone();
      } catch (error) {
        console.log("There was an error withdrawing => ", error);
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (voting) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">Processing ......</h1>
        </div>
      </Layout>
    );
  }

  if (processing) {
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
    
      </div>

      <div className="mb-4">
        <span className="font-bold">Reason:</span>
        <p className="mt-2">{reason && JSON.parse(reason)}</p>
      </div>

      {owner.toLowerCase() == wallet?.toLowerCase() && (
        <div className="mb-4">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Create Milestone
          </button>
        </div>
      )}

      <div className="flex">
        <div className="w-1/2 h-screen">
          <div className="mb-4 flex border p-2 mr-2">
            <span className="font-bold">Contract Owner:</span>
            <p className="ml-2">{owner}</p>
          </div>

          <div className="mb-4 flex border p-2 mr-2">
            <span className="font-bold">Target Amount:</span>
            <p className="ml-2">
              {(+amount / etherConstant).toFixed(18)} Ether
            </p>
          </div>

          <div className="mb-4 flex border p-2">
            <span className="font-bold">Campaign Duration:</span>
            <p className="ml-2">
              {campaignDuration && new Date(+campaignDuration).toDateString()}
            </p>
          </div>

          <div className="mb-4 flex border p-2 mr-2">
            <span className="font-bold">Number of Donors:</span>
            <p className="ml-2">{numberOfDonors.toString()}</p>
          </div>

          <div className="mb-4 flex border p-2 mr-2">
            <span className="font-bold">Total Ether Donated:</span>
            <p className="ml-2">
              {amountDonated && ethers.formatUnits(amountDonated.toString())}{" "}
              Ether
            </p>
          </div>
          <div className="mb-4 flex border p-2 mr-2">
            <span className="font-bold">My Donation:</span>
            <p className="ml-2">
              {myDonation && ethers.formatUnits(myDonation.toString())} Ether
            </p>
          </div>
          <div className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4 mr-2">
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
        </div>
        <div className="w-1/2 h-screen p-4">
          {/* Content for the right div */}
          {milestone && milestone.votingPeriod != "0" && (
            <React.Fragment>
              <div className="mb-4">
                <span className="font-bold">Milestone Reason:</span>
                <p className="mt-2">{JSON.parse(milestone.milestoneReason)}</p>
              </div>
              <div className="mb-4 flex border p-2 mr-2">
                <span className="font-bold">Approved:</span>
                <p className="ml-2">{milestone.approved ? "True" : "False"}</p>
              </div>

              <div className="mb-4 flex border p-2 mr-2">
                <span className="font-bold">Voting Period:</span>
                <p className="ml-2">
                  {new Date(+milestone.votingPeriod).toDateString()}
                </p>
              </div>

              <div className="mb-4 flex border p-2 mr-2">
                <span className="font-bold">Milestone Status:</span>
                <p className="ml-2">{milestoneStatus[+milestone.status]}</p>
              </div>

              {milestone && milestone.votes.length > 0 && (
                <h3 className="text-center text-lg">Milestone Votes</h3>
              )}

              {milestone.votes.map((voteArray: any) => {
                return (
                  <div className="mb-4 flex">
                    <span className="font-bold">
                      {voteArray[0].toString()}:
                    </span>
                    <p className="ml-2">{voteArray[1] ? "True" : "False"}</p>
                  </div>
                );
              })}

              {owner.toLowerCase() == wallet?.toLowerCase() && (
                <div className="mb-4">
                  <button
                    onClick={withdrawMilestoneDonation}
                    className="bg-red-500 text-white px-4 py-2"
                  >
                    Withdraw Milestone Fund
                  </button>
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-lg font-bold">Vote on Milestone</p>
              </div>

              <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-md">
                <p className="mb-4 text-sm">Choose your vote:</p>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleVoteOnMilestone(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 focus:outline-none"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleVoteOnMilestone(false)}
                    className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 focus:outline-none"
                  >
                    No
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      {!isConnected && (
        <p className="text-center text-sm mt-4">
          In order to donate, pleese connect your wallet
        </p>
      )}

      {contract && (
        <MileStoneModal
          isOpen={openModal}
          contract={contract}
          handleCloseModal={handleCloseModal}
        />
      )}

      <div className="flex w-full justify-center space-x-8"></div>
    </Layout>
  );
};

export default CrowdFundingDetails;

export const getServerSideProps = async (context: any) => {
  const { params } = context;

  //const url = `https://linea-goerli.infura.io/v3/${process.env.INFURA_KEY}`;
  const url = `${RPC_URL}/${process.env.INFURA_KEY}`;
  const provider = new ethers.JsonRpcProvider(url);

  const crowdFundingContract = getCrowdFundingInstanceContract({
    address: params?.address,
    provider,
  });

  const [
    fundingCID,
    purpose,
    amount,
    campaignDuration,
    owner,
    numberOfDonors,
    amountDonated,
    milestone,
  ] = await Promise.all([
    crowdFundingContract.fundingCId(),
    crowdFundingContract.purpose(),
    crowdFundingContract.targetAmount(),
    crowdFundingContract.campaignDuration(),
    crowdFundingContract.campaignOwner(),
    crowdFundingContract.numberOfDonors(),
    crowdFundingContract.getDonation(),
    crowdFundingContract.showCurrentMillestone(),
  ]);

  const fileData = await readFileFromRemoteServer(
    `https://devnet.irys.xyz/${fundingCID}`
  );

  //const milestoneData = await readFileFromRemoteServer(``);
  console.log("milestone data =>", milestone);
  let milestoneObject: MilestoneProps = {} as MilestoneProps;
  if (milestone.length > 0) {
    const milestoneReason = await readFileFromRemoteServer(
      `https://devnet.irys.xyz/${milestone[0]}`
    );
    milestoneObject = {
      milestoneReason: milestoneReason as string,
      approved: milestone[1],
      votingPeriod: milestone[2].toString(),
      status: milestone[3].toString(),
      votes: milestone[4] as any,
    };
  }

  return {
    props: {
      address: params?.address,
      owner,
      purpose,
      amount: amount.toString(),
      campaignDuration: campaignDuration.toString(),
      reason: fileData,
      numberOfDonors: numberOfDonors.toString(),
      amountDonated: amountDonated.toString(),
      milestone: milestoneObject,
    },
    //revalidate: 10,
  };
};
