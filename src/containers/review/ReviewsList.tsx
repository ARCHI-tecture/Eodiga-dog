'use client'
import React, { useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewRoute  } from '../../app/reviews/reviewroute';
import Button from '../../components/Button/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import { AlternateEmail } from '@mui/icons-material';

interface Review {
  key: number;
  date: string;
  shopname: string;
  content: string;
  lat:number;
  lng:number;
}


const ReviewsList: React.FC = () => {
//데이터 상태관리
  const { data, isLoading, error } = useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: reviewRoute ,
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
    }else{
      alert("해당 장소가 존재하지않습니다")
    }
};

  return (
    <div>
      <h1>내 리뷰</h1>
      <ul>
        {data?.map((review) => (
          <li key={review.key}>
            <div>{review.date}</div>
            <div>{review.shopname}</div>
            <div>{review.content}</div>
            <Button
              variant="pink" width="w-40" border="rounded-2xl"
              onClick={() => handleMoveBtn(review.lng, review.lat)}
              >보러가기
            </Button>
            <Button
              //onClick={() => handleDeleteBtn(review.key)}
              variant="red" width="w-40" border="rounded-2xl">삭제하기</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
