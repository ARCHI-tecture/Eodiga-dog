// 유저 정보를 담는 타입
export interface UserType {
  id: number; // 유저의 고유 ID
  email: string; // 유저의 이메일 주소
  name: string; // 유저의 이름 (혹은 닉네임)
  isLogged: boolean; // 로그인 여부를 나타내는 플래그
  createdAt: string; // 유저 계정 생성일 (ISO 문자열 형식)
}

// 회원가입 요청에 사용할 데이터 타입
export interface SignUpAPIBody {
  email: string; // 회원가입 시 유저가 입력한 이메일
  name: string; // 회원가입 시 유저가 입력한 이름 (혹은 닉네임)
  password: string; // 회원가입 시 유저가 입력한 비밀번호
}

// 유저 정보를 저장하는 타입
export interface StoredUserType {
  id: number; // 유저의 고유 ID
  email: string; // 유저의 이메일 주소
  name: string; // 유저의 이름 (혹은 닉네임)
  password: string; // 유저의 암호화된 비밀번호
  createdAt: any; // 유저 계정 생성일 (ISO 문자열 형식)
  updatedAt: any; // 유저 정보 마지막 수정일 (ISO 문자열 형식)
}
