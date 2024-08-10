"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/LoginContext"; // 경로를 올바르게 설정하세요
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/navigation"; // Next.js에서 제공하는 useRouter 훅
import { styled, alpha } from "@mui/material/styles"; // alpha 임포트 추가
import { Box, Typography } from "@mui/material";
import Link from "next/link"; // Next.js의 Link 컴포넌트
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RedOutlinedInput = styled(OutlinedInput)(
  ({ error }: { error: boolean }) => ({
    borderColor: error ? "red" : "inherit",
    "& fieldset": {
      borderColor: error ? "red" : "inherit",
    },
    "& input": {
      padding: "16px 14px",
    },
  })
);

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

const Login: React.FC = () => {
  const authData = useAuth();
  const router = useRouter();
  const { login } = authData;
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

    await login(
      data,
      () => {
        setLoginError("");
        router.push("/");
      },
      () => setLoginError("아이디 또는 비밀번호가 잘못되었습니다.")
    );
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
        marginTop: "-70px",
      }}
    >
      <Typography style={{ fontWeight: "bold" }}>로그인</Typography>
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
        <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
          <InputLabel shrink>이메일</InputLabel>
          <BootstrapInput
            id="bootstrap-input"
            fullWidth
            {...register("email", { required: "이메일은 필수값입니다." })}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
          <InputLabel shrink>비밀번호</InputLabel>
          <BootstrapInput
            id="bootstrap-input"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password", { required: "비밀번호는 필수값입니다." })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
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
        <Button
          variant="contained"
          type="submit"
          sx={{ display: "block", width: "100%", mt: 2 }}
        >
          로그인
        </Button>
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`}>
          {/* 카카오 로그인 이미지 코드 */}
        </Link>
      </form>
    </Box>
  );
};

export default Login;
