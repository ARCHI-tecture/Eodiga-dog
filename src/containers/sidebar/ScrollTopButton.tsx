import React from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { SxProps } from "@mui/system"; // SxProps를 불러옵니다.

interface ScrollTopButtonProps {
  onClick: () => void;
  sx?: SxProps; // sx를 정의합니다.
}

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({ onClick, sx }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        borderRadius: "50%",
        minWidth: 56,
        minHeight: 56,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx, // 추가된 sx prop을 적용합니다.
      }}
    >
      <ArrowUpwardIcon />
    </Button>
  );
};

export default ScrollTopButton;
