import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface ScrollTopButtonProps {
  onClick: () => void; // 함수 타입 정의
}

const StyledButton = styled(Button)({
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
});

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({ onClick }) => {
  return (
    <StyledButton variant="contained" color="primary" onClick={onClick}>
      <ArrowUpwardIcon />
    </StyledButton>
  );
};

export default ScrollTopButton;
