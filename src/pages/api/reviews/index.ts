import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, query } from '../../../app/api/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await getConnection();
  //리뷰데이터 가져오는 코드
  if (req.method === 'GET') {
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
    //리뷰작성시 sql로 전달하는 코드
  } else if (req.method === 'POST') {
    try {
      const reviewData = req.body;

      console.log("서버에서 받은 데이터:", reviewData);

      const insertSql = `
        INSERT INTO review (id,date, content, shopname,user_id, lat, lng, star)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        reviewData.id,
        reviewData.date,
        reviewData.content,
        reviewData.shopname,
        reviewData.user_id,
        reviewData.lat,
        reviewData.lng,
        reviewData.star
      ];

      await query(connection, insertSql, values);

      res.status(200).json({ message: '리뷰가 성공적으로 저장되었습니다' });
    } catch (error) {
      console.error('리뷰 저장 중 오류 발생:', error);
      res.status(500).json({ message: '서버 오류: 리뷰를 저장할 수 없습니다' });
    } finally {
      connection.release();
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
