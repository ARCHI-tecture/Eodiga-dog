import { Box, Grid } from "@mui/material";
import React from "react";
import LikeButton from "../Button/LikeButton";
import { CardPropsType } from "./type";

const Card: React.FC<CardPropsType> = ({ item }) => {
  // 사이드바 전용 카드라 크기가 전체화면으로 설정되어 있습니다

  return (
    <Grid className="flex justify-center m-3">
      <Box className="flex flex-col justify-center w-full h-56 border cursor-pointer border-gray rounded-xl">
        <Grid className="flex items-center justify-around">
          <h3 className="text-2xl font-bold">{item.시설명}</h3>
          <LikeButton item={item} />
        </Grid>
        <Grid className="flex flex-col">
          <p className="pl-10 pr-4 whitespace-pre-wrap">
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
