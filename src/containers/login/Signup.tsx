import { NextApiRequest, NextApiResponse } from "next";
import { getConnection, query } from "../../app/api/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, email, username, password } = req.body;

  // 입력 값 로그 추가
  console.log("Request body:", req.body);

  if (!id || !email || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const connection = await getConnection();
    const sql =
      "INSERT INTO login (id, username, pwd, email, createdAt) VALUES (?, ?, ?, ?, NOW())";
    const params = [id, username, password, email];

    await query(connection, sql, params);
    connection.release();

    return res
      .status(200)
      .json({ code: 200, message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
