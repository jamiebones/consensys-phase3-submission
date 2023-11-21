import { fundingFactoryContractServerInstance } from "apps/web/lib/contract.ts/contract.server";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (_, res) => {
  const deployedContracts =
    await fundingFactoryContractServerInstance.getContractDeployerAddress();
  res.status(200).json(deployedContracts);
};

export default handler;
