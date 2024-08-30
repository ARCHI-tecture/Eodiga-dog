"use client";
import React from "react";
import { reviewRoute } from "../../pages/api/reviews/reviewroute";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useMediaQuery } from '@mui/material';
import ReviewCard from "../../pages/api/reviews/ReviewCard";

const ReviewsList: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    //리뷰 전체 데이터
    const { data, isLoading, error } = useQuery<Review[]>({
        queryKey: ["reviews"],
        queryFn: reviewRoute,
    });

    if (isLoading) return <span>내 리뷰 불러오고있습니다. 잠시만 기다려주세요 </span>;
    if (error) return <div>내 리뷰를 불러오는중에 에러가 발생하였습니다.</div>;

    return (
        <div className="p-4">
            <h1 className={`p-2 text-2xl font-bold ${isMobile && 'flex justify-center'}`}>내 리뷰</h1>
            <ul>
                {data && data?.length > 0 ? (
                    data?.map((review) => (
                        <li key={review.id}>
                            <ReviewCard review={review} />
                        </li>
                    ))
                ) : (
                    <div>내 리뷰가 없습니다.</div>
                )}
            </ul>
        </div>
    );
};

export default ReviewsList;
