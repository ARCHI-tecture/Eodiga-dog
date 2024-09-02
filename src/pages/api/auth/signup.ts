import { NextApiRequest, NextApiResponse } from "next";
import { getConnection, query } from '../../../app/api/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, email, username, password } = req.body;

  try {
    const connection = await getConnection();

    const sql = "INSERT INTO login (id, username, pwd, email, createdAt) VALUES (?, ?, ?, ?, NOW())";
    const params = [id, username, password, email];

    await query(connection, sql, params);
    connection.release();

    return res.status(200).json({ code: 200, message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error(error)
  }
}
