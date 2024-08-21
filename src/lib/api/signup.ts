export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // (1)
    const { email, name, password, birthday } = req.body;
    if (!email || !name || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필요한 데이터가 없습니다.");
    } // (2)
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 405;
      return res.send("이미 가입된 이메일입니다.");
    } // (3)

    // (4), password를 hash password로 만듦
    const hashedPassword = bcrypt.hashSync(password, 8);

    // (5)
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      birthday,
      userImage: "/default_user.png",
    };
    Data.user.write([...users, newUser]);

    // (6-1)사용자 인증 토큰 만들기
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

    // (6-2) 토큰을 쿠키에 저장하기

    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      ).toUTCString()}; HttpOnly`
    );

    // TS 유틸리티 모듈
    const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> =
      newUser;
    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    // (6-3) User에게 반환할 때 패스워드는 빼고 반환함
    return res.send(newUser);
  }
};
