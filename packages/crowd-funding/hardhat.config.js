require("dotenv").config();
require('@typechain/hardhat');
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");



const private_key = process.env["PRIVATE_KEY"]


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.20",
      },
    ],

  },
  defaultNetwork: "linea",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    linea: {
      url: `https://rpc.goerli.linea.build`,
      accounts: [
        `0x${private_key}`
      ],
      chainId: 59140,
    },
    polygonTestnet: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [
        `0x${private_key}`
      ],
      chainId: 80001,
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    dontOverrideCompile: false // defaults to false
  },

};