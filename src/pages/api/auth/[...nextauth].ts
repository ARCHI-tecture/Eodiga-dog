import NextAuth, { User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getConnection, query } from '../../../app/api/db';
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";


interface User extends NextAuthUser {
  id: string;
  username: string;
  pwd: string;
  email: string;
  kakao_login?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const bcrypt = require("bcryptjs")

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const connection = await getConnection();
          const sql = "SELECT * FROM login WHERE email = ?";
          const params = [credentials?.email, credentials?.password];
          const users = await query<User[]>(connection, sql, params);

          if (users.length > 0) {
            const user = users[0];
            const isValidPassword = await bcrypt.compare(credentials?.password, user.pwd);

            if(isValidPassword) {
              return { id: String(user.id), name: user.username };
            } else {
              console.log("비밀번호가 일치하지 않습니다.");
              return null
            }
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
  pages: {
    signIn: '/login', 
    error: '/login',
  },
});
