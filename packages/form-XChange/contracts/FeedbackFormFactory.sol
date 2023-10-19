// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
import "./FeedbackForm.sol";
import "hardhat/console.sol";

contract FeedbackFormFactory {
    FeedbackForm[] public feedbackForms;

    function createFeedbackForm(
        string[] memory _questions,
        string memory _title,
        string memory _description
    ) public returns (FeedbackForm) {
        FeedbackForm feedbackForm = new FeedbackForm(_title, _description);
        feedbackForm.setQuestions(_questions);
        feedbackForms.push(feedbackForm);
        return feedbackForm;
    }

    function getFeedbackForms() public view returns (FeedbackForm[] memory) {
        return feedbackForms;
    }

    function getFeedbackFormById(uint _id) public view returns (FeedbackForm) {
        return feedbackForms[_id];
    }

    function getAllQuestions(
        uint _id
    ) public view returns (FeedbackForm.Question[] memory) {
        return feedbackForms[_id].getAllQuestions();
    }

    function submitFeedback(uint _id, uint[] memory _feedback) public {
        feedbackForms[_id].submitFeedback(_feedback);
    }
}
