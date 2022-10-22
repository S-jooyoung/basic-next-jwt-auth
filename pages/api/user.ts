import { NextApiResponse, NextApiRequest } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.basicJWT;

  if (!jwt) {
    res.json({ message: "쿠키가 없습니다." });
  }

  res.status(200).json({ basicJWT: jwt });
}
