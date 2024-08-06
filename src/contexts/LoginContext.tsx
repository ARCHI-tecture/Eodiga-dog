import React, { createContext, ReactNode, useContext, useState } from "react";

// Context에서 사용할 데이터의 타입 정의
interface AuthContextType {
  login: (
    data: { email: string; password: string },
    onSuccess: () => void,
    onError: () => void
  ) => Promise<void>;
}

// 기본값 정의 (필요에 따라 수정)
const defaultAuthContext: AuthContextType = {
  login: async () => {
    /* 기본 로그인 로직 */
  },
};

// LoginContext 생성
export const LoginContext = createContext<AuthContextType | null>(
  defaultAuthContext
);

// LoginProvider 컴포넌트 정의
export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<any>(null);

  // 실제 로그인 로직 구현
  const login = async (
    data: { email: string; password: string },
    onSuccess: () => void,
    onError: () => void
  ) => {
    try {
      // 예제 로그인 로직
      if (data.email === "test@example.com" && data.password === "password") {
        setAuth(data);
        onSuccess();
      } else {
        onError();
      }
    } catch (error) {
      onError();
    }
  };

  return (
    <LoginContext.Provider value={{ login }}>{children}</LoginContext.Provider>
  );
};

// useAuth 훅
export const useAuth = () => {
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error("useAuth must be used within a LoginProvider");
  }
  return context;
};
