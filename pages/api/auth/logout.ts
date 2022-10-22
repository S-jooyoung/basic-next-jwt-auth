import { serialize } from "cookie";
import { readdirSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.basicJWT;

  if (!jwt) {
    res.json({ message: "이미 로그아웃 되었습니다." });
  } else {
    // 쿠키 처리
    const serialised = serialize("basicJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "로그아웃에 성공하였습니다." });
  }
}
