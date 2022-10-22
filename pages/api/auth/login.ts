import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.SECRET_KEY as string;

export default function (req: NextApiRequest, res: NextApiResponse) {
  // 에러처리
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req.body;

  /**
   * TODO: Check in the database
   */
  if (username === "Admin" && password === "Admin") {
    // JWT 토큰 생성
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        admin: username === "Admin" && password === "Admin",
        username: username,
      },
      SECRET
    );

    // 쿠키 처리
    const serialised = serialize("basicJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "로그인에 성공하였습니다." });
  } else {
    res.json({ message: "로그인에 실패하였습니다." });
  }
}
