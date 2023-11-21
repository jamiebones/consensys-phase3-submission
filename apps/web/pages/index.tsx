import useSwr from "swr";
import Layout from "../components/Layout";
import { H1, Text } from "../components/Text";
import { useNetwork } from "../hooks/useNetwork";
import Balancer from "react-wrap-balancer";
import { CardSkeleton } from "../components/CardSkeleton";
import { useRouter } from "next/router";

export default function Web() {
  const fetcher = () => fetch("/api/contracts").then((res) => res.json());
  const {
    state: { isConnected },
  } = useNetwork();
  const router = useRouter();

  const { data, isLoading } = useSwr<string[]>("/contracts", fetcher, {
    refreshInterval: 100,
  });

  return (
    <Layout>
      <section className="flex flex-col items-center pt-20 pb-10">
        <H1 className="mb-0.5 mt-0 text-center md:text-5xl">
          Crowd Funding Contract
        </H1>
        <h3 className="w-259 h-20 font-bold text-2xl -mt-3 md:text-3xl leading-7 text-center flex items-center text-gray-500">
          Support an idea you passionate about
        </h3>
        <p className="w-474 h-23 font-normal text-base -mt-3 leading-6 text-center flex items-center text-gray-500">
          <Balancer>
            A smart contract to source for fundings for project
          </Balancer>
        </p>
      </section>

      <section className="flex flex-col w-full gap-6 mt-8 pb-10">
        {isLoading && <CardSkeleton />}
        {data &&
          data.map((contract) => {
            return (
              <div
                className="bg-gradient-to-r from-purple-500
               to-blue-500 p-6 rounded-lg shadow-md text-white"
                onClick={() => router.push(`/contract/${contract[0]}`)}
              >
                <p className="text-lg font-bold mb-2">Project Details</p>
                <p className="mb-2">
                  <span className="text-gray-300">Purpose:</span> {contract[1]}
                </p>
                <p>
                  <span className="text-gray-300">Contract Address:</span>{" "}
                  {contract[0]}
                </p>
              </div>
            );
          })}
      </section>
    </Layout>
  );
}
