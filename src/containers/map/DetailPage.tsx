 import React, { useEffect, useMemo, useState } from "react";
import { getOpenData } from "../../utils/db/OpenApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { reviewRoute } from "../../pages/api/reviews/reviewroute";
import {
  FaStar,
  FaMapMarkerAlt,
  FaLink,
  FaPhoneAlt,
  FaClock,
  FaCalendarAlt,
  FaParking,
  FaDog,
  FaHome,
  FaTree,
} from "react-icons/fa";
import { useMediaQuery } from "@mui/material";
import DetailIsDesktop from "./DetailIsDesktop";
import DetailIsMobile from "./DetailIsMobile";

interface DetailPageProps {
  open: boolean;
  onClose: () => void;
  item?: any;
}

interface OpenDataItem {
  [key: string]: string;
  lat: string;
  lng: string;
}

interface OpenDataResponse {
  data: OpenDataItem[];
}

const DetailPage: React.FC<DetailPageProps> = ({ item }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const searchParams = useSearchParams();
  //각 업체별 리뷰 갯수
  const [reviewNumber, setReviewNumber] = useState(0);
  //각업체별 리뷰 평균별점
  const [reviewsStar, setReviewsStar] = useState(0);
  //리뷰데이터
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  //디테일페이지 온오프
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);

  // searchParams에서 lat, lng 값 받기
  const latFromSearchParams = searchParams.get("lat");
  const lngFromSearchParams = searchParams.get("lng");

  // searchParams 또는 props 중 최신 값으로 변경
  useEffect(() => {
    if (latFromSearchParams !== lat) setLat(latFromSearchParams);
    if (lngFromSearchParams !== lng) setLng(lngFromSearchParams);
  }, [latFromSearchParams, lngFromSearchParams]);

  // 경위도에 맞는 데이터 출력
  useEffect(() => {
    if (item?.lat !== lat) setLat(item?.lat);
    if (item?.lng !== lng) setLng(item?.lng);
  }, [item?.lat, item?.lng]);

  // 주소가 있으면 자동으로 토글 열림
  useEffect(() => {
    if (lat && lng) {
      setDrawerOpen(true);
    }
  }, [lat, lng]);

  // 토글 닫기 버튼
  const closeIcon = () => {
    setDrawerOpen(false);
  };

// 리뷰 데이터 가져오기
useEffect(() => {
  const fetchReviewsData = async () => {
    try {
      const reviews = await reviewRoute();
      const matchingReviews = reviews.filter(
        (review: { lat: string; lng: string }) =>
          review.lat === lat && review.lng === lng
      );

      // 평균 별점 계산
      const averageStar = matchingReviews.length > 0
        ? matchingReviews.reduce((sum: number, review: any) => sum + review.star, 0) / matchingReviews.length
        : 0;

      // 데이터가 실제로 변경된 경우에만 상태 업데이트
      if (
        averageStar !== reviewsStar ||
        matchingReviews.length !== reviewNumber ||
        JSON.stringify(matchingReviews) !== JSON.stringify(reviewsData)
      ) {
        setReviewsStar(averageStar);
        setReviewNumber(matchingReviews.length);
        setReviewsData(matchingReviews);
      }
    } catch (error) {
      console.error("리뷰 데이터 연결 실패", error);
    }
  };

  fetchReviewsData();
}, [lat, lng, reviewsStar, reviewNumber, reviewsData]);

  //openapi 출력
  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
    refetchOnWindowFocus: false, // 창 포커스 시 데이터 재조회 방지
    enabled: !!lat && !!lng,// lat과 lng가 있을 때만 실행
    staleTime: 6000000,//100분동안 데이터최신으로 유지=>
    //눌렀던 장소의디테일페이지를 다시누르면 정보가 바로 뜸 렌더링 속도 약 8초에서 재렌더링안되고 기존 저장된 데이터를 사용하여 시간 0
  });

  if (isLoading) return <div>정보를 가져오고 있습니다...</div>;
  if (error) return <div>해당 장소에 대한 정보가 없습니다</div>;

  //위경도에 맞는 데이터 출력
  const filteredData =
  lat && lng && data?.data
    ? data.data.filter((item) => item.위도 === lat && item.경도 === lng)
    : [];

//정보정렬
  const sortByOrder = (
    entries: [string, string][],
    keysOrder: { text: string }[]
  ) => {
    return entries.sort(([keyA], [keyB]) => {
      const indexA = keysOrder.findIndex((entry) => entry.text === keyA);
      const indexB = keysOrder.findIndex((entry) => entry.text === keyB);
      return indexA - indexB;
    });
  };
//별점 선택
  const starHandler = (starCount: number) => {
    const stars: any[] = [];
    for (let i = 0; i < starCount; i++)
      stars.push(
        <div className="inline-block text-yellow-200" key={i}>
          <FaStar />
        </div>
      );
    return stars;
  };
  //필터링하여 가져올 openapi데이터
  const keysToShow1 = [{ text: "시설명" }, { text: "기본 정보_장소설명" }];
  const keysToShow2 = [
    { icon: <FaMapMarkerAlt />, text: "도로명주소" },
    { icon: <FaLink />, text: "홈페이지" },
    { icon: <FaPhoneAlt />, text: "전화번호" },
    { icon: <FaClock />, text: "운영시간" },
    { icon: <FaCalendarAlt />, text: "휴무일" },
    { icon: <FaParking />, text: "주차 가능여부" },
    { icon: <FaDog />, text: "반려동물 제한사항" },
    { icon: <FaHome />, text: "장소(실내) 여부" },
    { icon: <FaTree />, text: "장소(실외) 여부" },
  ];
  return (
    <>
    {/* 데스크탑버전일경우 */}
      {isDesktop && (
        <DetailIsDesktop
          filteredData={filteredData}
          sortByOrder={sortByOrder}
          reviewNumber={reviewNumber}
          reviewsStar={reviewsStar}
          keysToShow1={keysToShow1}
          keysToShow2={keysToShow2}
          reviewsData={reviewsData}
          starHandler={starHandler}
          drawerOpen={drawerOpen}
          closeIcon={closeIcon}
        />
      )}
      {/* 모바일버전일경우 */}
      {isMobile && (
        <DetailIsMobile
          filteredData={filteredData}
          sortByOrder={sortByOrder}
          reviewNumber={reviewNumber}
          reviewsStar={reviewsStar}
          keysToShow1={keysToShow1}
          keysToShow2={keysToShow2}
          reviewsData={reviewsData}
          starHandler={starHandler}
          drawerOpen={drawerOpen}
          closeIcon={closeIcon}
        />
      )}
    </>
  );
};

export default DetailPage;