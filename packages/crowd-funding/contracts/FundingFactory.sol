//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./CrowdFundingContract.sol";



contract FundingFactory is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
    //state variables;
    EnumerableSet.AddressSet private deployedAddressSet;
    address immutable crowdFundingImplementation;
    uint256 public fundingFee = 0.001 ether;

    //mapping
    mapping(address => FundingDetails[]) public deployedContracts;

    //struct
    struct FundingDetails {
        address contractAddress;
        string purpose;
    }

    //events
    event NewCrowdFundingCreated(
        address indexed owner,
        uint256 amount,
        address cloneAddress,
        string fundingCID
    );

    constructor(address _implementation) Ownable(msg.sender) {
        crowdFundingImplementation = _implementation;
    }

    function createCrowdFundingContract(
        string memory _fundingCId,
        string memory _purpose,
        uint256 _amount,
        uint256 _duration
    ) external payable {
        require(msg.value >= fundingFee, "deposit too small");
        address clone = Clones.clone(crowdFundingImplementation);
        (bool success, ) = clone.call(
            abi.encodeWithSignature(
                "initialize(string,string,uint256,uint256)",
                _fundingCId,
                _purpose,
                _amount,
                _duration
            )
        );
        require(success, "creation failed");
        FundingDetails[] storage fundingDetails = deployedContracts[msg.sender];
        FundingDetails memory newFundingDetails;
        newFundingDetails.contractAddress = clone;
        newFundingDetails.purpose = _purpose;

        fundingDetails.push(newFundingDetails);

        deployedAddressSet.add(msg.sender);
        emit NewCrowdFundingCreated(msg.sender, fundingFee, clone, _fundingCId);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "nothing to withdraw");
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "withdrawal failed");
    }

    function getUserdeployedContracts() public view returns (FundingDetails[] memory) {
        return deployedContracts[msg.sender];
    }

    receive() external payable {}
}
