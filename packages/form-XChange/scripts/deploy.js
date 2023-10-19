
const hre = require("hardhat");



async function main() {
 
  const feedbackFormFactory = await hre.ethers.deployContract("FeedbackFormFactory");

  await feedbackFormFactory.waitForDeployment();

  console.log(`feedbackform factory deployed to => ${feedbackFormFactory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
