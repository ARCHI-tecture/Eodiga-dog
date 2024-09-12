import { Box, Grid } from "@mui/material";
import React from "react";
import Button from "../../../components/Button/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMediaQuery } from '@mui/material';
import MoveBtn from "../../../components/Button/MoveBtn";


const ReviewCard: React.FC<ReviewCardPropsType> = ({ review }) => {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width:600px)");

    //삭제버튼
    const handleDeleteBtn = async (id: number) => {
        try {
            // DELETE 요청을 API로 보냅니다.
            const response = await axios.delete(`/api/reviews/${id}`);
            if (response.status === 200) {
                router.refresh();
            } else {
                alert("삭제에 실패했습니다.");
            }
        } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    // 리뷰 카드 입니다
    // 사용 예시: <ReviewCard date="24.05.19" name="38도씨" review="정말 좋아요~" />
    return (
        <Grid className={`m-3 max-w-max-card `}>
            <Box className="h-48 border border-gray rounded-xl">
                <Grid className="pt-5 pl-10 ">
                    <Grid className="pl-2 mb-2">
                        <p className="text-gray-400">{review.date.split("T")[0]}</p>
                        <h3 className={`text-3xl font-bold ${isMobile && 'text-xl'}`}>{review.shopname}</h3>
                        <p className="text-gray-500">{review.content}</p>
                    </Grid>
                    <Grid className="flex">
                        {/* DS - 보러가기 컴포넌트를 만들었습니다 */}
                        <MoveBtn lat={review.lat} lng={review.lng} isDesktop={false}/>
                        <Button variant="red" onClick={() => handleDeleteBtn(review.id)}>
                            삭제 하기
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default ReviewCard;
