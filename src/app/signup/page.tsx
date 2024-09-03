"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/navigation"; 
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import  bcrypt  from 'bcryptjs';

interface FormData {
  email: string;
  username: string;
  password: string;
  checkPassword: string;
}

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

const Signup: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
  const [loginError, setLoginError] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    if(session) {
      router.push("/")
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.checkPassword) {
      return setError(
        "checkPassword",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }


    if (data.password.includes(data.username) || data.password.includes(data.email.split("@")[0])) {
      return setError(
        "password",
        { message: "비밀번호에 닉네임 또는 이메일이 포함되어있습니다." },
        { shouldFocus: true } 
      );
    }

    try {

      const hasedPassword = await bcrypt.hash(data.password, 10)

      const signUpBody = {
        id: data.username,
        email: data.email,
        username: data.username,
        password: hasedPassword,
      };

      const response = await axios.post(`/api/auth/signup`, signUpBody);

      if (response.data.code === 200) {
        // 회원가입이 완료되면 자동으로 로그인
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          setLoginError(result.error);
        } else {
          Swal.fire({
            title: "축하합니다!",
            text: response.data.message,
            icon: "success", 
          });
          router.push("/");
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire({
          title: "에러 발생",
          text: err.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "에러 발생",
          text: "알 수 없는 오류가 발생했습니다.",
          icon: "error",
        });
      }
    }
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
      <Typography
        style={{ fontWeight: "bold", fontSize: "20pt", marginTop: "10%" }}
      >
        회원가입
      </Typography>
      <Typography sx={{ marginTop: "16px" }}>
        이미 가입된 회원이신가요?
        <Link
          href="/login"
          style={{ fontWeight: "bold", marginBottom: "100px" }}
        >
          로그인
        </Link>
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: 400 }}
      >
       <Button onClick={() => signIn("kakao")}>
          <img
            src="/assets/카카오 로그인 버튼.png"
            alt="카카오 로그인"
            style={{
              width: "325px",
              height: "40px",
              marginTop: "16px",
              marginLeft: "35px",
            }}
          />
        </Button>
        <Button onClick={() => signIn("naver")}>
          <img
            src="/assets/네이버 로그인 버튼.png"
            alt="네이버 로그인"
            style={{
              width: "325px",
              height: "40px",
              marginTop: "16px",
              marginLeft: "35px",
            }}
            
          />
        </Button>

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
            {errors.email && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.email.message}
              </span>
            )}
          </Box>
        </FormControl>
        <FormControl variant="standard" sx={{ width: "100%", mb: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel shrink style={{ fontWeight: "bold" }}>
              닉네임
            </InputLabel>
            <BootstrapInput
              id="username-input"
              fullWidth
              {...register("username", {
                required: "닉네임은 필수값입니다.",
              })}
            />
            {errors.username && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.username.message}
              </span>
            )}
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
              type="password"
              fullWidth
              {...register("password", {
                required: "비밀번호는 필수값입니다.",
              })}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.password.message}
              </span>
            )}
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
              비밀번호 확인
            </InputLabel>
            <BootstrapInput
              id="check-password-input"
              type="password"
              fullWidth
              {...register("checkPassword", {
                required: "비밀번호 확인은 필수값입니다.",
              })} 
            />
            {errors.checkPassword && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.checkPassword.message}
              </span>
            )}
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
        <Button
          variant="contained"
          type="submit"
          sx={{ display: "block", width: "100%", mt: 2 }}
        >
          회원가입
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
