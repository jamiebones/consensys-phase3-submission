/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace CrowdFundingContract {
  export type MilestoneVoteStruct = {
    donorAddress: AddressLike;
    vote: boolean;
  };

  export type MilestoneVoteStructOutput = [
    donorAddress: string,
    vote: boolean
  ] & { donorAddress: string; vote: boolean };

  export type MilestoneStruct = {
    milestoneCID: string;
    approved: boolean;
    votingPeriod: BigNumberish;
    status: BigNumberish;
    votes: CrowdFundingContract.MilestoneVoteStruct[];
  };

  export type MilestoneStructOutput = [
    milestoneCID: string,
    approved: boolean,
    votingPeriod: bigint,
    status: bigint,
    votes: CrowdFundingContract.MilestoneVoteStructOutput[]
  ] & {
    milestoneCID: string;
    approved: boolean;
    votingPeriod: bigint;
    status: bigint;
    votes: CrowdFundingContract.MilestoneVoteStructOutput[];
  };
}

export interface CrowdFundingContractInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "campaignDuration"
      | "campaignEnded"
      | "campaignOwner"
      | "creatNewMilestone"
      | "donationGiven"
      | "donors"
      | "etherBalance"
      | "fundingCId"
      | "getDonation"
      | "initialize"
      | "makeDonation"
      | "milestones"
      | "numberOfDonors"
      | "purpose"
      | "showCurrentMillestone"
      | "targetAmount"
      | "voteOnMilestone"
      | "withdrawMilestone"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "FundsDonated"
      | "FundsWithdrawn"
      | "Initialized"
      | "MilestoneCreated"
      | "MilestoneRejected"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "campaignDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "campaignEnded",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "campaignOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "creatNewMilestone",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "donationGiven",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "donors", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "etherBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fundingCId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDonation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "makeDonation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "milestones",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfDonors",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "purpose", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "showCurrentMillestone",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "targetAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "voteOnMilestone",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawMilestone",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "campaignDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "campaignEnded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "campaignOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creatNewMilestone",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "donationGiven",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "donors", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "etherBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fundingCId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDonation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "makeDonation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "milestones", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numberOfDonors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "purpose", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "showCurrentMillestone",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "targetAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteOnMilestone",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawMilestone",
    data: BytesLike
  ): Result;
}

export namespace FundsDonatedEvent {
  export type InputTuple = [
    donor: AddressLike,
    amount: BigNumberish,
    date: BigNumberish
  ];
  export type OutputTuple = [donor: string, amount: bigint, date: bigint];
  export interface OutputObject {
    donor: string;
    amount: bigint;
    date: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FundsWithdrawnEvent {
  export type InputTuple = [
    owner: AddressLike,
    amount: BigNumberish,
    date: BigNumberish
  ];
  export type OutputTuple = [owner: string, amount: bigint, date: bigint];
  export interface OutputObject {
    owner: string;
    amount: bigint;
    date: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MilestoneCreatedEvent {
  export type InputTuple = [
    owner: AddressLike,
    datecreated: BigNumberish,
    period: BigNumberish
  ];
  export type OutputTuple = [
    owner: string,
    datecreated: bigint,
    period: bigint
  ];
  export interface OutputObject {
    owner: string;
    datecreated: bigint;
    period: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MilestoneRejectedEvent {
  export type InputTuple = [yesvote: BigNumberish, novote: BigNumberish];
  export type OutputTuple = [yesvote: bigint, novote: bigint];
  export interface OutputObject {
    yesvote: bigint;
    novote: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CrowdFundingContract extends BaseContract {
  connect(runner?: ContractRunner | null): CrowdFundingContract;
  waitForDeployment(): Promise<this>;

  interface: CrowdFundingContractInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  campaignDuration: TypedContractMethod<[], [bigint], "view">;

  campaignEnded: TypedContractMethod<[], [boolean], "view">;

  campaignOwner: TypedContractMethod<[], [string], "view">;

  creatNewMilestone: TypedContractMethod<
    [milestoneCID: string, votingPeriod: BigNumberish],
    [void],
    "nonpayable"
  >;

  donationGiven: TypedContractMethod<[], [bigint], "view">;

  donors: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  etherBalance: TypedContractMethod<[], [bigint], "view">;

  fundingCId: TypedContractMethod<[], [string], "view">;

  getDonation: TypedContractMethod<[], [bigint], "view">;

  initialize: TypedContractMethod<
    [
      _fundingCId: string,
      _purpose: string,
      _amount: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  makeDonation: TypedContractMethod<[], [void], "payable">;

  milestones: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, boolean, bigint, bigint] & {
        milestoneCID: string;
        approved: boolean;
        votingPeriod: bigint;
        status: bigint;
      }
    ],
    "view"
  >;

  numberOfDonors: TypedContractMethod<[], [bigint], "view">;

  purpose: TypedContractMethod<[], [string], "view">;

  showCurrentMillestone: TypedContractMethod<
    [],
    [CrowdFundingContract.MilestoneStructOutput],
    "view"
  >;

  targetAmount: TypedContractMethod<[], [bigint], "view">;

  voteOnMilestone: TypedContractMethod<[vote: boolean], [void], "nonpayable">;

  withdrawMilestone: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "campaignDuration"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "campaignEnded"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "campaignOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "creatNewMilestone"
  ): TypedContractMethod<
    [milestoneCID: string, votingPeriod: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "donationGiven"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "donors"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "etherBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "fundingCId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getDonation"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      _fundingCId: string,
      _purpose: string,
      _amount: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "makeDonation"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "milestones"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, boolean, bigint, bigint] & {
        milestoneCID: string;
        approved: boolean;
        votingPeriod: bigint;
        status: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "numberOfDonors"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "purpose"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "showCurrentMillestone"
  ): TypedContractMethod<
    [],
    [CrowdFundingContract.MilestoneStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "targetAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "voteOnMilestone"
  ): TypedContractMethod<[vote: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawMilestone"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "FundsDonated"
  ): TypedContractEvent<
    FundsDonatedEvent.InputTuple,
    FundsDonatedEvent.OutputTuple,
    FundsDonatedEvent.OutputObject
  >;
  getEvent(
    key: "FundsWithdrawn"
  ): TypedContractEvent<
    FundsWithdrawnEvent.InputTuple,
    FundsWithdrawnEvent.OutputTuple,
    FundsWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "MilestoneCreated"
  ): TypedContractEvent<
    MilestoneCreatedEvent.InputTuple,
    MilestoneCreatedEvent.OutputTuple,
    MilestoneCreatedEvent.OutputObject
  >;
  getEvent(
    key: "MilestoneRejected"
  ): TypedContractEvent<
    MilestoneRejectedEvent.InputTuple,
    MilestoneRejectedEvent.OutputTuple,
    MilestoneRejectedEvent.OutputObject
  >;

  filters: {
    "FundsDonated(address,uint256,uint256)": TypedContractEvent<
      FundsDonatedEvent.InputTuple,
      FundsDonatedEvent.OutputTuple,
      FundsDonatedEvent.OutputObject
    >;
    FundsDonated: TypedContractEvent<
      FundsDonatedEvent.InputTuple,
      FundsDonatedEvent.OutputTuple,
      FundsDonatedEvent.OutputObject
    >;

    "FundsWithdrawn(address,uint256,uint256)": TypedContractEvent<
      FundsWithdrawnEvent.InputTuple,
      FundsWithdrawnEvent.OutputTuple,
      FundsWithdrawnEvent.OutputObject
    >;
    FundsWithdrawn: TypedContractEvent<
      FundsWithdrawnEvent.InputTuple,
      FundsWithdrawnEvent.OutputTuple,
      FundsWithdrawnEvent.OutputObject
    >;

    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "MilestoneCreated(address,uint256,uint256)": TypedContractEvent<
      MilestoneCreatedEvent.InputTuple,
      MilestoneCreatedEvent.OutputTuple,
      MilestoneCreatedEvent.OutputObject
    >;
    MilestoneCreated: TypedContractEvent<
      MilestoneCreatedEvent.InputTuple,
      MilestoneCreatedEvent.OutputTuple,
      MilestoneCreatedEvent.OutputObject
    >;

    "MilestoneRejected(uint256,uint256)": TypedContractEvent<
      MilestoneRejectedEvent.InputTuple,
      MilestoneRejectedEvent.OutputTuple,
      MilestoneRejectedEvent.OutputObject
    >;
    MilestoneRejected: TypedContractEvent<
      MilestoneRejectedEvent.InputTuple,
      MilestoneRejectedEvent.OutputTuple,
      MilestoneRejectedEvent.OutputObject
    >;
  };
}
