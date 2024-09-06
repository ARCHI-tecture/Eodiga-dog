"use client";
import React, { useEffect, useState } from "react";
import KakaoMap from "../components/Map/KakaoMap";
import DetailPage from "../containers/map/DetailPage";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./loading";
import Filter from "../components/Filter/Filter"; // Filter 컴포넌트 임포트
import ListStation from "./../containers/sidebar/ListStation";

const queryClient = new QueryClient();

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>(""); //필터 상태

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const isDesktop = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ height: "calc(100vh - 80px)" }}>
        <main className="relative top-0 left-0 w-full h-full">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="relative w-full h-full">
                <KakaoMap />
              </div>

              {/* Filter 컴포넌트 추가 */}
              <div className="absolute top-1 left-5 z-40">
                <Filter setFilterCategory={setFilterCategory} />
              </div>

              <Grid className="absolute top-0 left-0 flex">
                {isDesktop && (
                  <div>
                    <DetailPage open={open} onClose={toggleDrawer(false)} />
                    <ListStation
                      open={open}
                      onClose={toggleDrawer(false)}
                      filterCategory={filterCategory}
                    />
                  </div>
                )}
                {isMobile && (
                  <div>
                    <DetailPage open={open} onClose={toggleDrawer(false)} />
                    <ListStation
                      open={open}
                      onClose={toggleDrawer(false)}
                      filterCategory={filterCategory}
                    />
                  </div>
                )}
              </Grid>
            </>
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
