import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log('webhooks .......');
  response.status(200).json({ok: true});
}