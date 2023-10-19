import { ChangeEvent, useState, useEffect } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { H1 } from "../components/Text";
import { ethers } from "ethers";
import { abi } from "packages/form-XChange/artifacts/contracts/FeedbackFormFactory.sol/FeedbackFormFactory.json";
import { useNetwork } from "../hooks/useNetwork";
import { useRouter } from "next/router";
import AddIcon from "../components/AddIcon";
import TrashIcon from "../components/TrashIcon";
import { FEEDBACK_FACTORY_CONTRACT_ADDRESS } from "../lib/contract.ts/config";
import { FeedbackFormFactory } from "packages/form-XChange/typechain";

const classMap = {
  inputClasses:
    "w-full mt-6 border rounded-md py-2 px-4 placeholder-gray-400 placeholder-opacity-50",
  labelClasses: "text-primary-black font-medium text-lg",
};

export default function CreateForm() {
  const [questionsInput, setQuestionsInput] = useState<string[]>([""]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<FeedbackFormFactory | null>(null);
  const { state } = useNetwork();
  const router = useRouter();

  const getContractFactory = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      FEEDBACK_FACTORY_CONTRACT_ADDRESS,
      abi,
      signer
    ) as unknown as FeedbackFormFactory;
    setContract(contract);
  };

  useEffect(() => {
    if (contract == null) {
      getContractFactory();
    }
  });

  if (!state.isConnected) {
    router.push("/");
    return;
  }

  // const provider = new ethers.BrowserProvider(window.ethereum);
  // //const signer = await provider.getSigner();

  // const contract = new ethers.Contract(
  //   FEEDBACK_FACTORY_CONTRACT_ADDRESS,
  //   abi,
  //   provider
  // );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i?: number) => {
    const { name } = e.target;
    if (name === "form_questions" && i !== undefined) {
      const values = [...questionsInput];
      values[i] = e.target.value;
      setQuestionsInput(values);
    } else if (name === "form_title") {
      setTitle(e.target.value);
    } else if (name === "form_description") {
      setDescription(e.target.value);
    }
  };

  const handleDelete = (i: number) => {
    const values = [...questionsInput];
    values.splice(i, 1);
    setQuestionsInput(values);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (contract) {
        console.log("Contract => ", contract);
        const tx = await contract.createFeedbackForm(
          questionsInput,
          title,
          description
        );
        setLoading(true);
        await tx.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuestionsInput([""]);
      setTitle("");
      setDescription("");
      router.push("/");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">Creating form...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <H1 className="mt-20 text-center">Create new feedback form</H1>
      <main className="mt-12">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5 md:gap-10 place-items-end px-12 py-7 shadow-lg rounded-xl bg-[#FEFEFE] max-w-4xl mx-auto mb-10"
        >
          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label className={classMap.labelClasses} htmlFor="form_title">
                Form title
              </label>
              <input
                className={classMap.inputClasses}
                required
                onChange={(e) => handleChange(e)}
                value={title}
                placeholder="Title..."
                type="text"
                id="form_title"
                name="form_title"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                className={classMap.labelClasses}
                htmlFor="form_description"
              >
                Form description
              </label>
              <input
                className={classMap.inputClasses}
                required
                onChange={(e) => handleChange(e)}
                value={description}
                placeholder="Description..."
                type="text"
                id="form_description"
                name="form_description"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <label className={classMap.labelClasses} htmlFor="form_questions">
                Form questions
              </label>
              <span className="text-sm text-red-400 font ">
                * We only accept 1 to 5 answers, make sure you make 1 to 5
                questions
              </span>
            </div>
            {questionsInput?.map((data: string, i: number) => (
              <div className="flex gap-4" key={i}>
                <input
                  value={data}
                  required
                  onChange={(e) => handleChange(e, i)}
                  className={classMap.inputClasses}
                  placeholder="How likely are you to recommend this event to a friend?"
                  type="text"
                  id="form_questions"
                  name="form_questions"
                />
                {questionsInput?.length > 1 && (
                  <Button
                    onClick={() => handleDelete(i)}
                    type="button"
                    className="bg-red-500 h-fit w-fit max-w-[200px] mt-6 py-4 px-4"
                  >
                    <TrashIcon />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => setQuestionsInput([...questionsInput, ""])}
              type="button"
              className="py-2 w-full mx-auto md:mx-0 md:max-w-[210px] justify-center mt-6 flex items-center gap-2"
            >
              <AddIcon /> Add new question
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full mx-auto md:mx-0 py-2 md:max-w-[200px]"
          >
            Create Form
          </Button>
        </form>
      </main>
    </Layout>
  );
}
