import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, query } from '../../../app/api/db';

interface DeleteResult {
  affectedRows: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string' || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const connection = await getConnection();
  //id별 데이터 가져오는 코드
  if (req.method === 'DELETE') {
    try {
      const deleteSql = 'DELETE FROM review WHERE id = ?';
      const result = await query<DeleteResult>(connection, deleteSql, [Number(id)]);

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: '리뷰삭제에 성공하였습니다' });
      } else {
        return res.status(404).json({ message: '리뷰를 찾을수없습니다' });
      }
    } catch (error) {
      return res.status(500).json({ error: '리뷰삭제에 실패하였습니다' });
    } finally {
      connection.release();
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
