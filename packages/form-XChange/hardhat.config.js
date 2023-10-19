require("dotenv").config();
require("@nomiclabs/hardhat-truffle5");
require('@typechain/hardhat');
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-ethers");


const private_key = process.env["PRIVATE_KEY"]



module.exports = {
  solidity: {
    version: "0.8.13",
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
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
  
};