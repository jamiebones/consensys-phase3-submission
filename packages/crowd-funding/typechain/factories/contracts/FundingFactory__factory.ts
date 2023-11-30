/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  FundingFactory,
  FundingFactoryInterface,
} from "../../contracts/FundingFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC1167FailedCreateClone",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "cloneAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fundingCID",
        type: "string",
      },
    ],
    name: "NewCrowdFundingCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contractDeployed",
    outputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "purpose",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_fundingCId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_purpose",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "createCrowdFundingContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedContracts",
    outputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "purpose",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractDeployerAddress",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "purpose",
            type: "string",
          },
        ],
        internalType: "struct FundingFactory.FundingDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserdeployedContracts",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "purpose",
            type: "string",
          },
        ],
        internalType: "struct FundingFactory.FundingDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a060405266038d7ea4c680006002553480156200001c57600080fd5b5060405162001cbb38038062001cbb833981810160405281019062000042919062000233565b33600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000b85760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000af919062000276565b60405180910390fd5b620000c9816200010560201b60201c565b508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250505062000293565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001fb82620001ce565b9050919050565b6200020d81620001ee565b81146200021957600080fd5b50565b6000815190506200022d8162000202565b92915050565b6000602082840312156200024c576200024b620001c9565b5b60006200025c848285016200021c565b91505092915050565b6200027081620001ee565b82525050565b60006020820190506200028d600083018462000265565b92915050565b608051611a0c620002af60003960006105ab0152611a0c6000f3fe6080604052600436106100955760003560e01c80635d16e120116100595780635d16e1201461017b578063715018a6146101a65780638da5cb5b146101bd578063f2fde38b146101e8578063f4708521146102115761009c565b8063191679e6146100a1578063195c7484146100cc57806324600fc31461010a5780633840b49714610121578063459675551461013d5761009c565b3661009c57005b600080fd5b3480156100ad57600080fd5b506100b661023c565b6040516100c3919061104a565b60405180910390f35b3480156100d857600080fd5b506100f360048036038101906100ee91906110b6565b610383565b60405161010192919061113c565b60405180910390f35b34801561011657600080fd5b5061011f61045f565b005b61013b600480360381019061013691906112a1565b61055f565b005b34801561014957600080fd5b50610164600480360381019061015f919061136c565b610910565b60405161017292919061113c565b60405180910390f35b34801561018757600080fd5b506101906109f9565b60405161019d91906113bb565b60405180910390f35b3480156101b257600080fd5b506101bb6109ff565b005b3480156101c957600080fd5b506101d2610a13565b6040516101df91906113d6565b60405180910390f35b3480156101f457600080fd5b5061020f600480360381019061020a91906113f1565b610a3c565b005b34801561021d57600080fd5b50610226610ac2565b604051610233919061104a565b60405180910390f35b60606001805480602002602001604051908101604052809291908181526020016000905b8282101561037a57838290600052602060002090600202016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820180546102e99061144d565b80601f01602080910402602001604051908101604052809291908181526020018280546103159061144d565b80156103625780601f1061033757610100808354040283529160200191610362565b820191906000526020600020905b81548152906001019060200180831161034557829003601f168201915b50505050508152505081526020019060010190610260565b50505050905090565b6001818154811061039357600080fd5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546103dc9061144d565b80601f01602080910402602001604051908101604052809291908181526020018280546104089061144d565b80156104555780601f1061042a57610100808354040283529160200191610455565b820191906000526020600020905b81548152906001019060200180831161043857829003601f168201915b5050505050905082565b610467610c46565b6000479050600081116104af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a6906114ca565b60405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff16826040516104d59061151b565b60006040518083038185875af1925050503d8060008114610512576040519150601f19603f3d011682016040523d82523d6000602084013e610517565b606091505b505090508061055b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105529061157c565b60405180910390fd5b5050565b6002543410156105a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059b906115e8565b60405180910390fd5b60006105cf7f0000000000000000000000000000000000000000000000000000000000000000610ccd565b905060008173ffffffffffffffffffffffffffffffffffffffff16868686866040516024016106019493929190611608565b6040516020818303038152906040527f6fe0e395000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161068b9190611697565b6000604051808303816000865af19150503d80600081146106c8576040519150601f19603f3d011682016040523d82523d6000602084013e6106cd565b606091505b5050905080610711576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610708906116fa565b60405180910390fd5b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061075c610e4a565b83816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508681602001819052508181908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101908161082491906118c6565b505050600181908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816108af91906118c6565b5050503373ffffffffffffffffffffffffffffffffffffffff167f3ed5503670ea3fb26efced58bf9ff3575280523b8b1bf031f639417a5b8005d4600254868b6040516108fe93929190611998565b60405180910390a25050505050505050565b6003602052816000526040600020818154811061092c57600080fd5b9060005260206000209060020201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546109769061144d565b80601f01602080910402602001604051908101604052809291908181526020018280546109a29061144d565b80156109ef5780601f106109c4576101008083540402835291602001916109ef565b820191906000526020600020905b8154815290600101906020018083116109d257829003601f168201915b5050505050905082565b60025481565b610a07610c46565b610a116000610d7e565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610a44610c46565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610ab65760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610aad91906113d6565b60405180910390fd5b610abf81610d7e565b50565b6060600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610c3d57838290600052602060002090600202016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182018054610bac9061144d565b80601f0160208091040260200160405190810160405280929190818152602001828054610bd89061144d565b8015610c255780601f10610bfa57610100808354040283529160200191610c25565b820191906000526020600020905b815481529060010190602001808311610c0857829003601f168201915b50505050508152505081526020019060010190610b23565b50505050905090565b610c4e610e42565b73ffffffffffffffffffffffffffffffffffffffff16610c6c610a13565b73ffffffffffffffffffffffffffffffffffffffff1614610ccb57610c8f610e42565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610cc291906113d6565b60405180910390fd5b565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d79576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001606081525090565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ed182610ea6565b9050919050565b610ee181610ec6565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f21578082015181840152602081019050610f06565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f4982610ee7565b610f538185610ef2565b9350610f63818560208601610f03565b610f6c81610f2d565b840191505092915050565b6000604083016000830151610f8f6000860182610ed8565b5060208301518482036020860152610fa78282610f3e565b9150508091505092915050565b6000610fc08383610f77565b905092915050565b6000602082019050919050565b6000610fe082610e7a565b610fea8185610e85565b935083602082028501610ffc85610e96565b8060005b8581101561103857848403895281516110198582610fb4565b945061102483610fc8565b925060208a01995050600181019050611000565b50829750879550505050505092915050565b600060208201905081810360008301526110648184610fd5565b905092915050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61109381611080565b811461109e57600080fd5b50565b6000813590506110b08161108a565b92915050565b6000602082840312156110cc576110cb611076565b5b60006110da848285016110a1565b91505092915050565b6110ec81610ec6565b82525050565b600082825260208201905092915050565b600061110e82610ee7565b61111881856110f2565b9350611128818560208601610f03565b61113181610f2d565b840191505092915050565b600060408201905061115160008301856110e3565b81810360208301526111638184611103565b90509392505050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6111ae82610f2d565b810181811067ffffffffffffffff821117156111cd576111cc611176565b5b80604052505050565b60006111e061106c565b90506111ec82826111a5565b919050565b600067ffffffffffffffff82111561120c5761120b611176565b5b61121582610f2d565b9050602081019050919050565b82818337600083830152505050565b600061124461123f846111f1565b6111d6565b9050828152602081018484840111156112605761125f611171565b5b61126b848285611222565b509392505050565b600082601f8301126112885761128761116c565b5b8135611298848260208601611231565b91505092915050565b600080600080608085870312156112bb576112ba611076565b5b600085013567ffffffffffffffff8111156112d9576112d861107b565b5b6112e587828801611273565b945050602085013567ffffffffffffffff8111156113065761130561107b565b5b61131287828801611273565b9350506040611323878288016110a1565b9250506060611334878288016110a1565b91505092959194509250565b61134981610ec6565b811461135457600080fd5b50565b60008135905061136681611340565b92915050565b6000806040838503121561138357611382611076565b5b600061139185828601611357565b92505060206113a2858286016110a1565b9150509250929050565b6113b581611080565b82525050565b60006020820190506113d060008301846113ac565b92915050565b60006020820190506113eb60008301846110e3565b92915050565b60006020828403121561140757611406611076565b5b600061141584828501611357565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061146557607f821691505b6020821081036114785761147761141e565b5b50919050565b7f6e6f7468696e6720746f20776974686472617700000000000000000000000000600082015250565b60006114b46013836110f2565b91506114bf8261147e565b602082019050919050565b600060208201905081810360008301526114e3816114a7565b9050919050565b600081905092915050565b50565b60006115056000836114ea565b9150611510826114f5565b600082019050919050565b6000611526826114f8565b9150819050919050565b7f7769746864726177616c206661696c6564000000000000000000000000000000600082015250565b60006115666011836110f2565b915061157182611530565b602082019050919050565b6000602082019050818103600083015261159581611559565b9050919050565b7f6465706f73697420746f6f20736d616c6c000000000000000000000000000000600082015250565b60006115d26011836110f2565b91506115dd8261159c565b602082019050919050565b60006020820190508181036000830152611601816115c5565b9050919050565b600060808201905081810360008301526116228187611103565b905081810360208301526116368186611103565b905061164560408301856113ac565b61165260608301846113ac565b95945050505050565b600081519050919050565b60006116718261165b565b61167b81856114ea565b935061168b818560208601610f03565b80840191505092915050565b60006116a38284611666565b915081905092915050565b7f6372656174696f6e206661696c65640000000000000000000000000000000000600082015250565b60006116e4600f836110f2565b91506116ef826116ae565b602082019050919050565b60006020820190508181036000830152611713816116d7565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261177c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261173f565b611786868361173f565b95508019841693508086168417925050509392505050565b6000819050919050565b60006117c36117be6117b984611080565b61179e565b611080565b9050919050565b6000819050919050565b6117dd836117a8565b6117f16117e9826117ca565b84845461174c565b825550505050565b600090565b6118066117f9565b6118118184846117d4565b505050565b5b818110156118355761182a6000826117fe565b600181019050611817565b5050565b601f82111561187a5761184b8161171a565b6118548461172f565b81016020851015611863578190505b61187761186f8561172f565b830182611816565b50505b505050565b600082821c905092915050565b600061189d6000198460080261187f565b1980831691505092915050565b60006118b6838361188c565b9150826002028217905092915050565b6118cf82610ee7565b67ffffffffffffffff8111156118e8576118e7611176565b5b6118f2825461144d565b6118fd828285611839565b600060209050601f831160018114611930576000841561191e578287015190505b61192885826118aa565b865550611990565b601f19841661193e8661171a565b60005b8281101561196657848901518255600182019150602085019450602081019050611941565b86831015611983578489015161197f601f89168261188c565b8355505b6001600288020188555050505b505050505050565b60006060820190506119ad60008301866113ac565b6119ba60208301856110e3565b81810360408301526119cc8184611103565b905094935050505056fea26469706673582212209d958efed9ef3229c9eecc436b9b27b77993ca2c3b55422dfc3b4156940b0c4264736f6c63430008140033";

type FundingFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FundingFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FundingFactory__factory extends ContractFactory {
  constructor(...args: FundingFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _implementation: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_implementation, overrides || {});
  }
  override deploy(
    _implementation: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_implementation, overrides || {}) as Promise<
      FundingFactory & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FundingFactory__factory {
    return super.connect(runner) as FundingFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FundingFactoryInterface {
    return new Interface(_abi) as FundingFactoryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): FundingFactory {
    return new Contract(address, _abi, runner) as unknown as FundingFactory;
  }
}
