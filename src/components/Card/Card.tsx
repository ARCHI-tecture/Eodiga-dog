import { Box, Grid } from "@mui/material";
import React from "react";
import LikeButton from "../Button/LikeButton";
import { CardPropsType } from "./type";

const Card: React.FC<CardPropsType> = ({ item }) => {
    // 사이드바 전용 카드라 크기가 전체화면으로 설정되어 있습니다

    return (
        <Grid className="flex justify-center m-3">
            <Box className="border border-gray w-full h-56 rounded-xl flex flex-col justify-center">
                <Grid className="flex items-center justify-around">
                <h3 className="font-bold text-2xl">{item.시설명}</h3>
                    <LikeButton item={item} />
                </Grid>
                <Grid className="flex flex-col">
                <p className="whitespace-pre-wrap pl-10 pr-4">
                        {item.도로명주소 ? item.도로명주소 : item.지번주소}
                    </p>
                    <Grid className="pl-10">
                    <p>{item.운영시간}</p>
                        <span>⭐️ 4.3 / </span>
                        <span>리뷰 999+</span>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Card;
