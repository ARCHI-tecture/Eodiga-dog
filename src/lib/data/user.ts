import { query } from "../../app/api/db"; // 데이터베이스 쿼리 함수 가져오기
import { StoredUserType } from "../type";

// 사용자 추가
export const addUser = async (
  user: Omit<StoredUserType, "userImage" | "birthday">
) => {
  const sql = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";
  const values = [user.email, user.name, user.password];
  const result = await query(sql, values);
  return result;
};

// 사용자 조회
export const getUsers = async () => {
  const sql = "SELECT * FROM users";
  const rows = await query(sql);
  return rows;
};

// 사용자 존재 여부 확인
// export const userExists = async (email: string) => {
//   const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
//   const values = [email];
//   const rows: [{ count: number }] = await query(sql, values);
//   return rows[0].count > 0;
// };
