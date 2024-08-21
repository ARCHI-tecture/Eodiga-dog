import { NextApiRequest, NextApiResponse } from "next";
import { getConnection, query } from "../../../app/api/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, shopname, location, type, user_id, lat, lng } = req.body;

    interface DeleteResult {
        affectedRows: number;
    }

    try {
        const connection = await getConnection();

        if (req.method === "POST") {
            const result = await query(
                connection,
                `INSERT INTO bookmark (id, shopname, location, type, user_id, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id, shopname, location, type, user_id, lat, lng]
            );
            res.status(200).json(result);
        } else if (req.method === "DELETE") {
            const deleteSql = "DELETE FROM bookmark WHERE id = ? OR shopname= ?";
            const result = await query<DeleteResult>(connection, deleteSql, [id, shopname]);
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "좋아요 삭제에 성공하였습니다" });
            } else {
                return res.status(404).json({ message: "좋아요를 찾을수없습니다" });
            }
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
}
