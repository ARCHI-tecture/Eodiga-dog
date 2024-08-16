import { NextRequest, NextResponse } from "next/server";
import { getConnection, query } from "../db"; // db 경로는 실제 경로에 맞게 조정

export async function GET(request: NextRequest) {
  const connection = await getConnection();

  try {
    const selectSql = "SELECT * FROM review";
    const reviews = await query(connection, selectSql,[]);

    return new NextResponse(JSON.stringify({ reviews }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("리뷰 조회 실패", error);
    return new NextResponse(JSON.stringify({ error: "리뷰 조회 실패" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    connection.release();
  }
}
