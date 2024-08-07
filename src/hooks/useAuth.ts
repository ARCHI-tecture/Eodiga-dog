1; // hooks/useAuth.tsx

import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

// useAuth 훅의 반환 타입 정의
export const useAuth = () => {
  const context = useContext(LoginContext);

  if (context === null) {
    throw new Error("useAuth must be used within a LoginProvider");
  }

  return context;
};
