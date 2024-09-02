import NextAuth, { User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getConnection, query } from '../../../app/api/db';



interface User extends NextAuthUser {
  id: string;
  username: string;
  pwd: string;
  email: string;
  kakao_login?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const connection = await getConnection();
          const sql = "SELECT * FROM login WHERE email = ? AND pwd = ?";
          const params = [credentials?.email, credentials?.password];
          const users = await query<User[]>(connection, sql, params);

          if (users.length > 0) {
            const user = users[0];
            return { id: String(user.id), name: user.username };
          } else {
            console.log("유저를 찾을 수 없습니다");
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
