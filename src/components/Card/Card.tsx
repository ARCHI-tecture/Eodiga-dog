import { Box, Grid } from "@mui/material";
import React from "react";
import LikeButton from "../Button/LikeButton";

const Card: React.FC<CardPropsType> = ({ name, addr, time, star, review }) => {
    // 사이드바 전용 카드라 크기가 전체화면으로 설정되어 있습니다
    return (
        <Grid className="flex justify-center m-3">
            <Box className="border border-gray w-full h-48 rounded-xl flex flex-col justify-center">
                <Grid className="flex items-center justify-around">
                    <h3 className="font-bold text-3xl">{name}</h3>
                    <LikeButton />
                </Grid>
                <Grid className="flex flex-col">
                    <p className="whitespace-pre-wrap pl-10 pr-4">{addr}</p>
                    <Grid className="pl-10">
                        <p>{time}</p>
                        <span>⭐️ {star} / </span>
                        <span>리뷰 {review}</span>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Card;
