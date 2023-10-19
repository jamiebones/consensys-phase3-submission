import { ethers } from "ethers";
import { useEffect, useState, useMemo } from "react";
import contract from "packages/form-XChange/artifacts/contracts/FeedbackForm.sol/FeedbackForm.json";
import { FeedbackForm } from "packages/form-XChange/typechain";

export type Question = {
  value: string;
  userFeedback: number | null;
};

export const useQuestions =  (formContractAddress: string) => {
  const { abi } = contract;
  const provider = useMemo(() => new ethers.BrowserProvider(window.ethereum), []);
  const [signer, setSigner] = useState<null |ethers.JsonRpcSigner>(null);
  const [FeedbackFormContract, setFeedbackFormContract] = useState<null | FeedbackForm>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const feedbacks = questions.map((q) => q.userFeedback);
  const [isAllFeedbackGiven, setIsAllFeedbackGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAllFeedbackGiven(!feedbacks.includes(null));
  }, [feedbacks]);

  useEffect(() => {
    const getSigner = async () => {
      const signer = await provider.getSigner();
      setSigner(signer);
    };
    getSigner();
  }, [provider]);

  useEffect(() => {
    if (signer) {
      const FeedbackForm = new ethers.Contract(
        formContractAddress,
        abi,
        signer
      ) as unknown as FeedbackForm;
      setFeedbackFormContract(FeedbackForm);
    }
  }, [signer, formContractAddress, abi]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setIsLoading(true);
        if ( FeedbackFormContract ){
          const questions = await FeedbackFormContract.getAllQuestions();
          setQuestions(
            questions.map((question: any) => ({
              value: question,
              userFeedback: null,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (FeedbackFormContract) {
      getQuestions();
    }
  }, [FeedbackFormContract]);

  const addFeedback = async (questionIndex: number, userFeedback: number) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, userFeedback };
        }
        return question;
      })
    );
  };

  const submitFeedback = async (answers: number[]) => {
    setIsLoading(true);

    if (!isAllFeedbackGiven) return;

    try {
      if ( FeedbackFormContract){
        await FeedbackFormContract.submitFeedback(answers);
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLocalFeedbacks = async () => {
    setQuestions(
      questions.map((question) => ({ ...question, userFeedback: null }))
    );
  };

  return {
    questions,
    isAllFeedbackGiven,
    isLoading,
    addFeedback,
    submitFeedback,
    clearLocalFeedbacks,
  };
};