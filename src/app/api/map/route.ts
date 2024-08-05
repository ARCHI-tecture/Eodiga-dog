import { getConnection, query } from "../db";

export async function GET() {
    const connection = await getConnection();

    try {
        const reviewSql = "SELECT * FROM review";
        const loginSql = "SELECT * FROM login";
        const bookmarkSql = "SELECT * FROM bookmark";

        const reviews = await query(connection, reviewSql);
        const logins = await query(connection, loginSql);
        const bookmarks = await query(connection, bookmarkSql);

        const result = {
            reviews,
            logins,
            bookmarks,
        };

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Database query failed", error);
        return new Response(JSON.stringify({ error: "Database query failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        connection.release();
    }
}
