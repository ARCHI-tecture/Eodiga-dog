"use client";
import React from "react";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";
import KakaoMap from "../components/Map/KakaoMap";
import DetailPage from "../containers/map/DetailPage";
import { Grid, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";

// 'http://localhost:3000/' 경로(루트의 콘텐츠 표시)
const Home: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  // 상세정보 토글 상태 관리
  const [open, setOpen] = React.useState(false);
  // Drawer 토글 함수
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div style={{ height: "calc(100vh - 80px)" }}>
      <main className="relative top-0 left-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* kakao 지도 호출 */}
          <KakaoMap />
        </div>
        {/* // 임시 홈화면 */}
        <Grid className="absolute top-0 left-0 flex">
          {isDesktop && (
            <div>
              <Button onClick={toggleDrawer(true)} className="z-10">
                임시상세정보버튼
              </Button>
              <DetailPage open={open} onClose={toggleDrawer(false)} />
            </div>
          )}
          <Filter />
        </Grid>
      </main>
    </div>
  );
};

export default Home;
