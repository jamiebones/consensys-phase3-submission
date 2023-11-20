import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import { H3 } from "../Text";
import DatePicker from "react-datepicker";
import { ChangeEvent, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CrowdFundingContract } from "packages/crowd-funding/typechain";

const classMap = {
  textAreaClass:
    "w-full mt-6 border rounded-md py-2 px-4 placeholder-gray-400 placeholder-opacity-50 h-40",
  inputClasses:
    "w-full mt-6 border rounded-md py-2 px-4 placeholder-gray-400 placeholder-opacity-50",
  labelClasses: "text-primary-black font-medium text-lg",
};

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
  contract: CrowdFundingContract | null;
};

const MileStoneModal: FC<Props> = ({ isOpen, handleCloseModal, contract }) => {
  const [endDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== null) {
      setDescription(e.target.value);
    }
  };

  const handleDescriptionUpload = async (description: string) => {
    const res = await fetch("/api/upload-description", {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        description: description,
      }),
    });

    return await res.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description) return;
    const confirmDetails = confirm(
      `Milestone description: ${description}
       Milestone voting end date: ${endDate}
      `
    );
    if (!confirmDetails) return;
    try {
      if (contract) {
        setLoading(true);
        const milestoneId = await handleDescriptionUpload(description);
        const timestamp = new Date(endDate).getTime();
        const txn = await contract.creatNewMilestone(milestoneId, timestamp);
        await txn.wait(2);
        setLoading(false);
        setDescription("");
      }
    } catch (error) {
      console.log("Error creating milestone => ", error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          handleCloseModal();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-center w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {loading && (
                  <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold text-center">
                      Creating Milestone........
                    </h1>
                  </div>
                )}
                {!loading && (
                  <React.Fragment>
                    <button
                      onClick={handleCloseModal}
                      className="absolute text-3xl right-3 top-1 hover:opacity-40"
                    >
                      &times;
                    </button>
                    <H3>Create a new Milestone</H3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="flex flex-col flex-start">
                        <div className="flex w-full">
                          <div className="flex flex-col w-full">
                            <label
                              className={classMap.labelClasses}
                              htmlFor="form_title"
                            >
                              Description
                            </label>
                            <textarea
                              className={classMap.textAreaClass}
                              required
                              value={description}
                              placeholder="Description on the fund raising purpose"
                              name="description"
                              onChange={(e) => handleDescriptionChange(e)}
                            />
                          </div>
                        </div>

                        <div className="flex w-full gap-10">
                          <div className="flex flex-col w-full">
                            <label
                              className={classMap.labelClasses}
                              htmlFor="form_title"
                            >
                              Last date for donation
                            </label>
                            <DatePicker
                              className={classMap.inputClasses}
                              selected={endDate}
                              onChange={(date: Date) => setStartDate(date)}
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full mx-auto md:mx-0 py-2 md:max-w-[200px]"
                        >
                          Create milestone
                        </Button>
                      </div>
                    </form>
                  </React.Fragment>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MileStoneModal;
