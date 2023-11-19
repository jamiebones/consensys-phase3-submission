import useSwr from "swr";
import Layout from "../components/Layout";
import { H1, Text } from "../components/Text";
import { useNetwork } from "../hooks/useNetwork";
import Balancer from "react-wrap-balancer";

export default function Web() {
  const fetcher = () => fetch("/api/forms").then((res) => res.json());
  const {
    state: { isConnected },
  } = useNetwork();

  const { data, isLoading } = useSwr<string[]>("/forms", fetcher, {
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

   
    </Layout>
  );
}
