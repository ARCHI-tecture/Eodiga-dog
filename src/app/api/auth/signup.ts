// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { addUser, userExists } from "../../../lib/data/user";
// import { StoredUserType } from "../../../lib/type";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { email, name, password, birthday } = req.body;

//     if (!email || !name || !password || !birthday) {
//       res.status(400).send("필요한 데이터가 없습니다.");
//       return;
//     }

//     const exists = await userExists(email);
//     if (exists) {
//       res.status(405).send("이미 가입된 이메일입니다.");
//       return;
//     }

//     const hashedPassword = bcrypt.hashSync(password, 8);

//     const newUser: StoredUserType = {
//       id: 0, // 자동 증가 ID
//       email,
//       name,
//       password: hashedPassword,
//     };

//     await addUser(newUser);

//     const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

//     res.setHeader(
//       "Set-Cookie",
//       `access_token=${token}; Path=/; Expires=${new Date(
//         Date.now() + 60 * 60 * 24 * 1000 * 3
//       ).toUTCString()}; HttpOnly`
//     );

//     const newUserWithoutPassword: Partial<StoredUserType> = { ...newUser };
//     delete newUserWithoutPassword.password;

//     res.status(200).send(newUserWithoutPassword);
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
