import { Box, Button, TextField } from "@mui/material";
import React from "react";

interface SearchInputProps {
  width: string;
  onClick: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  width,
  onClick,
  handleSearchChange,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <Box width={width} sx={{ display: "flex", gap: "4px" }}>
      <TextField
        sx={{ flexGrow: "1" }}
        placeholder="검색어를 입력하세요."
        size="small"
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} // Enter 키 입력 감지
      />
      <Button variant="contained" color="primary" onClick={onClick}>
        검색
      </Button>
    </Box>
  );
};

export default SearchInput;
