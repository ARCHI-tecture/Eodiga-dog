import React, { useEffect, useState } from "react";
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

  const [reviewNumber, setReviewNumber] = useState(0);
  const [reviewsStar, setReviewsStar] = useState(0);
  const [reviewsData, setReviewsData] = useState<any>();
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

  useEffect(() => {
    if (item?.lat !== lat) setLat(item?.lat);
    if (item?.lng !== lng) setLng(item?.lng);
  }, [item?.lat, item?.lng]);

  useEffect(() => {
    if (lat && lng) {
      setDrawerOpen(true);
    }
  }, [lat, lng]);

  const closeIcon = () =>{
    setDrawerOpen(false);
  }

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const reviews = await reviewRoute();
        const matchingReviews = reviews.filter(
          (review: { lat: string; lng: string }) =>
            review.lat === lat && review.lng === lng
        );
        const averageStar =
          matchingReviews.reduce(
            (sum: number, review: any) => sum + review.star,
            0
          ) / matchingReviews.length;
        setReviewNumber(matchingReviews.length);
        setReviewsData(matchingReviews);
        setReviewsStar(Math.round(averageStar));
      } catch (error) {
        console.error("리뷰데이터 연결실패", error);
      }
    };
    fetchReviewsData();
    const interval = setInterval(fetchReviewsData, 30000);
    return () => clearInterval(interval);
  }, [lat, lng]);

  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });

  if (isLoading) return <div>정보를 가져오고 있습니다...</div>;
  if (error) return <div>해당 장소에 대한 정보가 없습니다</div>;

  const filteredData =
    lat && lng
      ? data?.data.filter((item) => item.위도 === lat && item.경도 === lng)
      : [];

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

  return (
    <>
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
      {/* 모바일 버전 */}
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