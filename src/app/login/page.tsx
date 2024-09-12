"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Next.js에서 제공하는 useRouter 훅
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SiNaver } from "react-icons/si";
import useMediaQuery from "@mui/material/useMediaQuery";

// 커스텀 BootstrapInput
const BootstrapInput = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "fullWidth",
})<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  width: fullWidth ? "100%" : "auto",
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    padding: "10px 12px",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}));

// OR 구분자
const Divider = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  textAlign: "center",
  position: "relative",
  "&::before": {
    content: '"OR"',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
    color: theme.palette.text.primary,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "0",
    right: "0",
    borderBottom: `1px solid ${theme.palette.divider}`,
    transform: "translateY(-50%)",
    zIndex: 0,
  },
}));

// 비밀번호 찾기 버튼 스타일
const UnderlinedText = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  textDecoration: "underline",
  cursor: "pointer",
  paddingBottom: theme.spacing(1),
}));

const Login: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // 미디어 쿼리: 데스크탑 및 모바일 구분
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [loginError, setLoginError] = useState("");

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    if (!data.email || !data.password) {
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setLoginError("아이디 또는 비밀번호가 잘못되었습니다.");
    } else {
      setLoginError("");
      router.push("/");
    }

    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 70px)",
        marginTop: isMobile ? "10px" : "-70px",
        padding: isMobile ? "0 16px" : "0", // 모바일일 때 패딩 추가
      }}
    >
      {isDesktop && (
        <>
          <Typography
            style={{ fontWeight: "bold", fontSize: isMobile ? "16pt" : "20pt" }}
          >
            로그인
          </Typography>
          <Typography sx={{ marginTop: "16px" }}>
            아직 회원이 아니신가요?
            <Link
              href="/signup"
              style={{ fontWeight: "bold", marginBottom: "100px" }}
            >
              회원가입
            </Link>
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => signIn("kakao")}
                className={`flex border items-center rounded-lg w-${
                  isMobile ? "72" : "80"
                } h-12 text-lg mt-5 mb-5 bg-kakao-yellow`}
              >
                <img
                  src="/kakao.png"
                  alt="카카오 로그인"
                  className="w-10 ml-5 mr-16"
                />
                카카오 로그인
              </button>

              <button
                type="button"
                onClick={() => signIn("naver")}
                className={`flex border items-center rounded-lg w-${
                  isMobile ? "72" : "80"
                } h-12 text-lg text-white mb-5 bg-naver-green`}
              >
                <SiNaver className="w-10 ml-5 mr-16" />
                네이버 로그인
              </button>
            </div>
            <Divider style={{ marginBottom: "32px" }} />

            <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputLabel shrink style={{ fontWeight: "bold" }}>
                  이메일
                </InputLabel>
                <BootstrapInput
                  id="email-input"
                  fullWidth
                  {...register("email", { required: "이메일은 필수값입니다." })}
                />
              </Box>
            </FormControl>
            <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputLabel shrink style={{ fontWeight: "bold" }}>
                  비밀번호
                </InputLabel>
                <BootstrapInput
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("password", {
                    required: "비밀번호는 필수값입니다.",
                  })}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-120%)",
                    zIndex: 1,
                    fontSize: 20, // 아이콘 크기 조정
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
            </FormControl>

            {loginError && !errors.email && !errors.password && (
              <span
                style={{
                  display: "block",
                  color: "red",
                  fontSize: "0.8rem",
                  marginBottom: "16px",
                }}
              >
                {loginError}
              </span>
            )}
            <UnderlinedText
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "10pt",
              }}
            >
              비밀번호 찾기
            </UnderlinedText>
            <Button
              variant="contained"
              type="submit"
              sx={{ display: "block", width: "100%", mt: 2 }}
            >
              로그인
            </Button>
          </form>
        </>
      )}

      {isMobile && (
        <>
          <Link href="/">
            <h1 className="text-main-black text-xl">어디가개</h1>
          </Link>
          <Typography
            style={{ fontWeight: "bold", fontSize: isMobile ? "16pt" : "20pt" }}
          >
            로그인
          </Typography>
          <Typography sx={{ marginTop: "16px" }}>
            아직 회원이 아니신가요?
            <Link
              href="/signup"
              style={{ fontWeight: "bold", marginBottom: "100px" }}
            >
              회원가입
            </Link>
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "80%", maxWidth: 300 }}
          >
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => signIn("kakao")}
                className={`flex border items-center rounded-lg w-${
                  isMobile ? "72" : "80"
                } h-12 text-lg mt-5 mb-5 bg-kakao-yellow`}
              >
                <img
                  src="/kakao.png"
                  alt="카카오 로그인"
                  className="w-10 ml-5 mr-16"
                />
                카카오 로그인
              </button>

              <button
                type="button"
                onClick={() => signIn("naver")}
                className={`flex border items-center rounded-lg w-${
                  isMobile ? "72" : "80"
                } h-12 text-lg text-white mb-5 bg-naver-green`}
              >
                <SiNaver className="w-10 ml-5 mr-16" />
                네이버 로그인
              </button>
            </div>
            <Divider style={{ marginBottom: "32px" }} />

            <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputLabel shrink style={{ fontWeight: "bold" }}>
                  이메일
                </InputLabel>
                <BootstrapInput
                  id="email-input"
                  fullWidth
                  {...register("email", { required: "이메일은 필수값입니다." })}
                />
              </Box>
            </FormControl>
            <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputLabel shrink style={{ fontWeight: "bold" }}>
                  비밀번호
                </InputLabel>
                <BootstrapInput
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("password", {
                    required: "비밀번호는 필수값입니다.",
                  })}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-120%)",
                    zIndex: 1,
                    fontSize: 20, // 아이콘 크기 조정
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
            </FormControl>

            {loginError && !errors.email && !errors.password && (
              <span
                style={{
                  display: "block",
                  color: "red",
                  fontSize: "0.8rem",
                  marginBottom: "16px",
                }}
              >
                {loginError}
              </span>
            )}
            <UnderlinedText
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "10pt",
              }}
            >
              비밀번호 찾기
            </UnderlinedText>
            <Button
              variant="contained"
              type="submit"
              sx={{ display: "block", width: "100%", mt: 2 }}
            >
              로그인
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default Login;
