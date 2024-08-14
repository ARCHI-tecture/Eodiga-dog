"use client";
import React, { useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewRoute } from "../../app/reviews/reviewroute";
import Button from "../../components/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { AlternateEmail } from "@mui/icons-material";
import ReviewCard from "../../app/reviews/ReviewCard";

interface Review {
  key: number;
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
  // const handleDeleteBtn = async(Key: number) => {
  //   console.log('버튼은 눌림');
  //   await fetch('/api/reviews/{Key}', { method: 'DELETE' });
  //   queryClient.invalidateQueries({queryKey:['reviews']});
  // };

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
            <li key={review.key}>
              <ReviewCard
                date={review?.date}
                name={review?.shopname}
                review={review?.content}
              />
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
