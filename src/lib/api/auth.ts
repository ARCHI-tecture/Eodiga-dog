import { UserType } from "../type";
import { SignUpAPIBody } from "../type";
import axios from ".";

// UserType: 유저에게 정보 전달하는 타입, 패스워드를 뺌
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);
