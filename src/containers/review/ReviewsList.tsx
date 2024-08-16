'use client'
import React from 'react';
import { reviewRoute  } from '../../app/api/reviews/reviewroute';
import { QueryClient, useQuery} from "@tanstack/react-query";

import ReviewCard from "../../app/api/reviews/ReviewCard";

const ReviewsList: React.FC = () => {

//리뷰 전체 데이터
  const { data, isLoading, error } = useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: reviewRoute,
  });

  if (isLoading) return <span>Loding...</span>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="p-2 text-2xl font-bold">내 리뷰</h1>
      <ul>
        {data && data?.length > 0 ? (
          data?.map((review) => (
            <li key={review.id}>
              <ReviewCard
                review={review}
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
