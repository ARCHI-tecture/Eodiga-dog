//review 데이터 전부를 출력 
import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, query } from '../../../app/api/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const connection = await getConnection();

    try {
      const selectSql = "SELECT * FROM review";
      const reviews = await query(connection, selectSql, []);

      return res.status(200).json({ reviews });
    } catch (error) {
      console.error("리뷰 조회 실패", error);
      return res.status(500).json({ error: "리뷰 조회 실패" });
    } finally {
      connection.release();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
