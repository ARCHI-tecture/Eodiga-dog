'use client'
import React from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewRoute  } from '../../app/reviews/reviewroute';
import Button from '../../components/Button/Button';
import { useRouter } from 'next/navigation';
//보러가기버튼: 리스트와 상세페이지가 완성되면 각 업체마다 특정 번호?기호?키?를 부여 route에서 주소를 만들어서 상세페이지로 이동???

interface Review {
  key: number;
  date: string;
  shopname: string;
  content: string;
}

const ReviewsList: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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

  return (
    <div>
      <h1>내 리뷰</h1>
      <ul>
        {data?.map((review) => (
          <li key={review.key}>
            <div>{review.date}</div>
            <div>{review.shopname}</div>
            <div>{review.content}</div>
            <Button variant="pink" width="w-40" border="rounded-2xl">보러가기</Button>
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
