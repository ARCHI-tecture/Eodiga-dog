// src/app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getConnection, query } from "../../db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestedId = parseInt(params.id, 10);
  console.log("아이디는 무엇이냐222",params.id);
//왜아이디를 받지를 못하니?....
  if (isNaN(requestedId)) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid ID parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const connection = await getConnection();

  try {
    const deleteSql = "DELETE FROM review WHERE id = ?";
    await query(connection, deleteSql, [requestedId]);

    return new NextResponse(JSON.stringify({ message: "삭제 성공" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("삭제 실패", error);
    return new NextResponse(JSON.stringify({ error: "삭제 실패" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    connection.release();
  }
}
