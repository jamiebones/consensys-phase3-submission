
const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const questions = ["question 1", "question 2"];
const title = "title";
const description = "description";

describe("FeedbackFormFactory", function () {
  async function deployFeedbackFormFactoryFixture() {
    const [deployer, addr1, addr2] = await ethers.getSigners();
    let feedbackFormFactory = await ethers.deployContract("FeedbackFormFactory");
    let FeedbackForm = await ethers.getContractFactory("FeedbackForm");
    await feedbackFormFactory.waitForDeployment();
    await feedbackFormFactory.createFeedbackForm(questions, title, description);
    return { feedbackFormFactory, FeedbackForm, deployer, addr1, addr2 };
  }

  describe("Deployment", function () {

    it("should create a new Feedbackform contract", async function () {
      const { feedbackFormFactory, FeedbackForm } = await loadFixture(deployFeedbackFormFactoryFixture);
      const feedbackForms = await feedbackFormFactory.getFeedbackForms();
      expect(feedbackForms.length).to.equal(1)
      expect((await feedbackFormFactory.getAllQuestions(0)).length).to.equal(2)
      const feedbackForm = await FeedbackForm.attach(feedbackForms[0]);
      expect(await feedbackForm.title()).to.equal(title);
      expect(await feedbackForm.description()).to.equal(description);
    });

    it("should submit the feedbacks to the form questions correctly", async function () {
      const { feedbackFormFactory } = await loadFixture(deployFeedbackFormFactoryFixture);
      const FORM_ID = 0;
      const Q1_ANSWER = 1;
      const Q2_ANSWER = 4;

      await feedbackFormFactory.submitFeedback(FORM_ID, [Q1_ANSWER, Q2_ANSWER]);
      const question1 = (await feedbackFormFactory.getAllQuestions(0))[0];
      const question2 = (await feedbackFormFactory.getAllQuestions(0))[1];
      expect(question1[1][0]).to.equal(Q1_ANSWER);
      expect(question2[1][0]).to.equal(Q2_ANSWER);
    });

    it("should revert if same user tries to submit feedback again", async function () {
      const { feedbackFormFactory, addr1, addr2} = await loadFixture(deployFeedbackFormFactoryFixture);
      console.log("feedfactory target => ", feedbackFormFactory.target)
      console.log("address 1=> ", addr1.address)
      console.log("address 2=> ", addr2.address)
      await feedbackFormFactory.connect(addr1).submitFeedback(0, [1, 4]);
      await expect(feedbackFormFactory.connect(addr1).submitFeedback(0, [3, 2]))
      .to.be.revertedWith("User has already prvoded feedback.");
    });

    it("should allow multiple users to submit feedback to the same form", async function () {
      const { feedbackFormFactory, addr1, addr2} = await loadFixture(deployFeedbackFormFactoryFixture);
      await feedbackFormFactory.connect(addr1).submitFeedback(0, [1, 4]);
      await expect(feedbackFormFactory.connect(addr2).submitFeedback(0, [3, 2]))
      .to.not.be.reverted;
    });


  })

})



// contract("FeedbackFormFactory", () => {
//   let feedbackFormFactory;
//   let FeedbackForm;
//   let deployer;
//   let commenter;

//   beforeEach(async () => {
//     let [deployer, commenter] = await hre.ethers.getSigners();
//     deployer = deployer
//     commenter = commenter;
//     feedbackFormFactory = await ethers.deployContract("FeedbackFormFactory");
//     FeedbackForm = await hre.ethers.getContractFactory("FeedbackForm");
//     await feedbackFormFactory.connect(deployer).createFeedbackForm(questions, title, description);
//   });

//   const questions = ["question 1", "question 2"];
//   const title = "title";
//   const description = "description";

//   it("should create a new Feedbackform contract", async () => {
//     const feedbackForms = await feedbackFormFactory.connect(deployer).getFeedbackForms();
//     assert.equal(feedbackForms.length, 1, "Incorrect number of feedback forms");

//     assert.equal(
//       (await feedbackFormFactory.getAllQuestions(0)).length,
//       2,
//       "Incorrect number of questions"
//     );

//     const feedbackForm = await FeedbackForm.at(feedbackForms[0]);
//     assert.equal(await feedbackForm.title(), title, "form title is wrong");
//     assert.equal(
//       await feedbackForm.description(),
//       description,
//       "form description is wrong"
//     );
//   });

//   it("should submit the feedbacks to the form questions correctly", async () => {
//     const FORM_ID = 0;
//     const Q1_ANSWER = 1;
//     const Q2_ANSWER = 4;

//     await feedbackFormFactory.submitFeedback(FORM_ID, [Q1_ANSWER, Q2_ANSWER]);

//     /**
//    * await feedbackFormFactory.getAllQuestions(0) = [
//       [ 'question 1', [ '1' ], value: 'question 1', feedback: [ '1' ] ],
//       [ 'question 2', [ '4' ], value: 'question 2', feedback: [ '4' ] ]
//       ]
//    */
//     const question1 = (await feedbackFormFactory.getAllQuestions(0))[0];
//     const question2 = (await feedbackFormFactory.getAllQuestions(0))[1];

//     assert.equal(question1[1][0], Q1_ANSWER);

//     assert.equal(question2[1][0], Q2_ANSWER);
//   });

//   it("should revert if same user tries to submit feedback again", async () => {
//     await feedbackFormFactory.submitFeedback(0, [1, 4]);
//     await expectRevert(
//       feedbackFormFactory.submitFeedback(0, [3, 2]),
//       "User has already prvoded feedback."
//     );
//   });
// });
