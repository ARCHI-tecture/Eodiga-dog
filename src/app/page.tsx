"use client";
import React, { useState, useEffect } from "react";
import KakaoMap from "../components/Map/KakaoMap";
import { useMediaQuery } from "@mui/material";
import Loading from "./loading";

// 'http://localhost:3000/' 경로(루트의 콘텐츠 표시
const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    // const isDesktop = useMediaQuery("(min-width:600px)");
    // 상세정보 토글 상태 관리
    const [open, setOpen] = React.useState(false);
    // Drawer 토글 함수
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="flex ">
            <main className="absolute top-0 left-0 w-screen h-screen">
                {isLoading ? (
                    <Loading />
                ) : (
                    // 여기에 홈화면 코드 작성해주세요!
                    <>
                        {/* kakao 지도 호출 */}
                        <KakaoMap />
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
