import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { uploadData } from "../../utils/utils";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { description } = req.body;
    const transactionId = await uploadData(description);
    res.status(200).json(transactionId);
  } catch (error) {
    console.log("error ", error);
    res.status(400).json({ error: error });
  }
};

export default handler;
