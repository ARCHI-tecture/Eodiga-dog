import { Box, Grid } from "@mui/material";
import React from "react";
import Button from "../../components/Button/Button";

const ReviewCard: React.FC<ReviewCardPropsType> = ({ date, name, review }) => {
    // 리뷰 카드 입니다
    // 사용 예시: <ReviewCard date="24.05.19" name="38도씨" review="정말 좋아요~" />
    return (
        <Grid className="flex justify-center m-3">
            <Box className="border border-gray w-3/5 h-48 rounded-xl">
                <Grid className="pt-5 pl-10 ">
                    <Grid className="pl-2 mb-2">
                        <p className="text-gray-400">{date}</p>
                        <h3 className="font-bold text-3xl">{name}</h3>
                        <p className="text-gray-500">{review}</p>
                    </Grid>
                    <Grid className="flex">
                        <Button variant="pink">보러 가기</Button>
                        <Button variant="red">삭제 하기</Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default ReviewCard;
