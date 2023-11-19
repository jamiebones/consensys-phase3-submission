

const { ethers } = require("hardhat");

async function main() {
  //deploy the implementation contracts here
  const crowdFundingImplementation = await ethers.deployContract("CrowdFundingContract");
  await crowdFundingImplementation.waitForDeployment();
  //deploy the factory contract
  const crowdFundingFactory = await ethers.deployContract(
    "FundingFactory", [crowdFundingImplementation.target]
  );
  await crowdFundingFactory.waitForDeployment();

  console.log("Implementation contract deployed to => ", crowdFundingImplementation.target);
  console.log("Factory contract deployed to => ", crowdFundingFactory.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
