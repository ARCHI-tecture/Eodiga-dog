"use client";
import React from "react";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";
import { Grid, useMediaQuery } from "@mui/material";

const Home: React.FC = () => {
    const isDesktop = useMediaQuery("(min-width:600px)");
    return (
        // 임시 홈화면
        <Grid className="flex">
            {isDesktop && (
                <div className="w-96 h-full border border-black mr-4 min-w-80">
                    <Card
                        name="38도 씨"
                        addr="경기도 양주시 남면개나리 20길"
                        time="11:00 - 21:30"
                        star="4.3"
                        review="999+"
                    />
                    <Card
                        name="1723 카페"
                        addr="전라북도 전주시 완산구 오목대길 83"
                        time="매일 10:30~22:00"
                        star="4.3"
                        review="999+"
                    />
                    <Card
                        name="24시 동물응급의료센터"
                        addr="서울특별시 중랑구 망우로 247"
                        time="매일 00:00~24:00"
                        star="4.3"
                        review="999+"
                    />
                    <Card
                        name="가람동물병원(제주)"
                        addr="제주특별자치도 서귀포시 대정읍 최남단해안로29번길 22"
                        time="월~금 08:30~18:00, 토 08:30~18:00"
                        star="4.3"
                        review="999+"
                    />
                    <Card
                        name="가온약국"
                        addr="부산광역시 강서구 신호산단2로 33"
                        time="월~금 09:00~21:00, 토 09:00~20:00, 일 09:00~19:00, 법정공휴일 10:00~15:00"
                        star="4.3"
                        review="999+"
                    />
                </div>
            )}

            <Filter />
        </Grid>
    );
};

export default Home;
