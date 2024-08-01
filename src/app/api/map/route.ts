import { getConnection, query } from "../db";

export async function GET() {
  const connection = await getConnection();
  const sql = "SELECT * FROM bookmark";
  const result = await query(connection, sql);
  connection.release();
  return new Response(JSON.stringify(result));
}
