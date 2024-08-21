"use client";
import React from "react";
import Button from "../../components/Button/Button";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { AlternateEmail } from "@mui/icons-material";
import { reviewRoute } from "../../pages/api/reviews/reviewroute";
import ReviewCard from "../../pages/api/reviews/ReviewCard";

//key 대문자 K이다
interface Review {
    id: number;
    date: string;
    shopname: string;
    content: string;
    lat: number;
    lng: number;
}

const ReviewsList: React.FC = () => {
    const router = useRouter();

    //데이터 상태관리

    const { data, isLoading, error } = useQuery<Review[]>({
        queryKey: ["reviews"],
        queryFn: reviewRoute,
    });

    if (isLoading) return <span>Loding...</span>;
    if (error) return <div>Error: {error.message}</div>;

    //삭제버튼 만드는중
    const handleDeleteBtn = async (id: number) => {
        try {
            const response = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
            console.log("api/map");
            console.log(response);
            if (response.ok) {
                router.refresh();
            } else {
                throw new Error("삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("삭제 에러:", error);
        }
    };

    //보러가기 버튼을 누르면 위도와 경도를 url에 출력및 홈으로 이동
    const handleMoveBtn = (lng: number | null, lat: number | null) => {
        if (lng !== null && lat !== null) {
            window.location.href = `/?lat=${lat}&lng=${lng}`;
        } else {
            alert("해당 장소가 존재하지않습니다");
        }
    };

    return (
        <div className="p-4">
            <h1 className="p-2 text-2xl font-bold">내 리뷰</h1>
            <ul>
                {data && data?.length > 0 ? (
                    data?.map((review) => (
                        <li key={review.id}>
                            <ReviewCard review={review} />
                        </li>
                    ))
                ) : (
                    <div>즐겨찾기가 없습니다.</div>
                )}
            </ul>
        </div>
    );
};

export default ReviewsList;
