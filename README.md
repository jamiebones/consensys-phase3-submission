# Crowd Funding Contract: A submision for Phase 3 of the Consensys Ambassador Program 


### Project Description

The project is cloned using RAD application for [FormXChange](https://github.com/Consensys/Form-XChange).
It consists of two smart contract and a NextJS application for interactng with the contract. The project allows a creator to create a smart contract for the purpose of soliciting for funds. There is a factory contract `FundingFactory` that is used for creating each instance of the `CrowdFundingContract`. The `FundingFactory` uses `Openzeppellin` Clones for creating instances of the `CrowdFundingContract`. A creator pays a fee to the `FundingFactory` before creating a contract. 

Contract description is stored on `Arweave` via `IRYS` so as to reduce the cost of storage as it will be too expensive to be stored on Ethereum. The id of the description is saved on Ethereum on contract creation. Users can donate Ether to any project of their choice and creators create milestones which are voted on by donors. A milestone is approved when 2/3 of donors votes yes approving the milestone. A creator can withdraw a portion of the Ether when a milestone is successfully. A creator can withdraw funds from the contract three times via succesfully created and approved milestones. 


### Technical Specification

This project requires that NodeJS be installed on the machine. 

* Smart Contract is written in Solidity 
* Smart Contract Framework is hardhat
* Frontend application is written in NextJS
* Environmental Variables => <br/>
   &nbsp;&nbsp; PRIVATE_KEY ( private key of a wallet used for paying for Arweave upload and Deployment ) <br/>
   &nbsp;&nbsp; INFURA_KEY ( Your Infura private key )
* Install dependencies by running `npm install` from the root of your project
* Deploy the application by running `npm run linea` this will deploy the application to the `Linea` Tesnet.
* Copy the deployed address from the terminal and input it on the file `apps/web/lib/contracts/config.ts`
* Connect your wallet and interact with the application


### Runing Test

Navigate to the root directory and run `npm run test`


### Challenges

* The frontend is manually refreshed to get the updated changes in the blockchain
* The frontend of the application is not artistically pleasing and more work need to be done in that regards.
* The dapps is not yet production ready but it offered an opportunity to deep dive into Consensys ecosystem and tools. 







