"use client";
import React from "react";
import Button from "../components/Button/Button";
import KakaoMap from "../components/Map/KakaoMap";

// 'http://localhost:3000/' 경로(루트의 콘텐츠 표시
const Home: React.FC = () => {
  return (
    <div className="flex ">
      <main className="absolute top-0 left-0 w-screen h-screen">
        {/* kakao 지도 호출 */}
        <KakaoMap />
      </main>
    </div>
  );
};

export default Home;
