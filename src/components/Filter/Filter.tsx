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
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchInput from "./SearchInput";

const Filter: React.FC<{ setFilterCategory: (category: string) => void }> = ({
  setFilterCategory,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  // 선택된 필터의 인덱스 상태
  const [filterVariant, setFilterVariant] = useState<number | null>(null);

  // ListStation의 열림 상태
  const [isListOpen, setIsListOpen] = useState(false);

  // 현재 선택된 필터 카테고리
  const [currentCategory, setCurrentCategory] = useState<string>("");

  // 필터 목록
  const filterList = [
    { name: "식당", icon: <RestaurantIcon /> },
    { name: "카페", icon: <LocalCafeIcon /> },
    { name: "미용실", icon: <ContentCutIcon /> },
    { name: "병원", icon: <LocalHospitalIcon /> },
    { name: "여행", icon: <BedIcon /> },
  ];

  // ListStation 열고 닫는 함수
  const handleToggleList = () => {
    setIsListOpen(!isListOpen);
  };

  // 필터 버튼 클릭 시 호출되는 함수
  const handleFilterClick = (index: number, category: string) => {
    setFilterVariant(index); // 선택된 필터의 인덱스 저장
    setCurrentCategory(category); // 현재 필터 카테고리 업데이트
    setFilterCategory(category); // 필터 카테고리를 부모 컴포넌트에 전달
  };

  // ListStation 닫는 함수
  const handleCloseList = () => {
    setIsListOpen(false);
  };

  return (
    <Grid
      display="flex"
      className={`${isDesktop ? "" : "justify-center w-full"}`}
    >
      {isDesktop && (
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            left: isListOpen ? 320 : 0, // ListStation 열릴 때 좌측 이동
            zIndex: 1000, // 필터 버튼이 ListStation보다 위에 위치
            transition: "left 0.3s ease", // 부드러운 이동 효과
          }}
        >
          <IconButton onClick={handleToggleList} sx={{ left: 2 }}>
            {isListOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          {/* 필터 버튼들 */}
          {filterList.map((filter, index) => (
            <Grid className="m-1 mt-2 z-40" key={index}>
              <Button
                variant={filterVariant === index ? "green" : "white"}
                border="rounded-3xl"
                onClick={() => handleFilterClick(index, filter.name)}
              >
                {filter.icon}
                {filter.name}
              </Button>
            </Grid>
          ))}
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            display: "flex",
            borderRadius: "1rem",
            //mt: 1,
            zIndex: 50,
          }}
        >
          {/* 필터 버튼들 */}
          <Grid className="flex border border-gray rounded-xl mt-10 z-50">
            <IconButton onClick={handleToggleList}>
              {isListOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            {filterList.map((filter, index) => (
              <Grid key={index}>
                <Button
                  variant={filterVariant === index ? "pink" : "white"}
                  border={`${index === 0 && "rounded-l-xl"} ${
                    index === 4 && "rounded-r-xl"
                  } border-none`}
                  width="w-16"
                  height="h-8"
                  onClick={() => {
                    setFilterVariant(index);
                  }}
                >
                  {filter.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

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
    </Grid>
  );
};

export default Filter;
