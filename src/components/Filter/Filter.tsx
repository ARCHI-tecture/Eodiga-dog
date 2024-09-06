import React, { useState } from "react";
import { Grid, IconButton, Box } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BedIcon from "@mui/icons-material/Bed";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "../Button/Button";
import ListStation from "../../containers/sidebar/ListStation";

const Filter: React.FC<{ setFilterCategory: (category: string) => void }> = ({
  setFilterCategory,
}) => {
  const [filterVariant, setFilterVariant] = useState<number | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const filterList = [
    { name: "식당", icon: <RestaurantIcon /> },
    { name: "카페", icon: <LocalCafeIcon /> },
    { name: "미용실", icon: <ContentCutIcon /> },
    { name: "병원", icon: <LocalHospitalIcon /> },
    { name: "여행", icon: <BedIcon /> },
  ];

  // ListStation을 열고 닫는 함수
  const handleToggleList = () => {
    setIsListOpen(!isListOpen);
  };

  // 필터 선택 함수
  const handleFilterClick = (index: number, category: string) => {
    setFilterVariant(index); // 선택된 필터의 인덱스를 저장
    setCurrentCategory(category); // 현재 필터 카테고리 업데이트
    setFilterCategory(category); // 필터 카테고리를 부모 컴포넌트에 전달
  };

  // ListStation을 닫는 함수
  const handleCloseList = () => {
    setIsListOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          left: isListOpen ? 320 : 0, // 창이 열리면 옆으로 이동
          zIndex: 1000, // 필터 버튼이 창보다 위에 위치
          transition: "left 0.3s ease", // 부드럽게 이동
        }}
      >
        <IconButton onClick={handleToggleList} sx={{ left: "2" }}>
          {isListOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        {/* 필터 버튼들 */}
        {filterList.map((filter, index) => (
          <Grid className="m-1 mt-2 z-40" key={index}>
            <Button
              z-Index="1001"
              variant={filterVariant === index ? "green" : "white"}
              onClick={() => handleFilterClick(index, filter.name)}
            >
              {filter.icon}
              {filter.name}
            </Button>
          </Grid>
        ))}
      </Box>

      {/* ListStation 컴포넌트 조건부 렌더링 */}
      {isListOpen && (
        <div className="absolute top-0 left-0 z-50">
          <ListStation
            open={isListOpen}
            onClose={handleCloseList}
            filterCategory={currentCategory}
          />
        </div>
      )}
    </>
  );
};

export default Filter;
