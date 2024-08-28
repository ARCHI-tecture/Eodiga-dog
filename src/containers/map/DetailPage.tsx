import React, { useEffect, useState } from "react";
import { getOpenData } from "../../utils/db/OpenApi";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
// import ReviewWrite from "../../pages/api/reviews/ReviewWrite";
import { reviewRoute } from "../../pages/api/reviews/reviewroute";
import { FaStar, FaMapMarkerAlt, FaLink, FaPhoneAlt, FaClock, FaCalendarAlt, FaParking, FaDog, FaHome, FaTree, FaQuestion } from 'react-icons/fa';
import { useMediaQuery } from "@mui/material";
import LikeButton from "../../components/Button/LikeButton";
import bookmark from "../bookmark/bookmark";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface DetailPageProps {
<<<<<<< HEAD
  open: boolean;
  onClose: () => void;
=======
    open: boolean;
    onClose: () => void;
    item?: any;
>>>>>>> 4b0d364b6beb97b6ba44283a489a8e0f9b05b603
}


interface OpenDataItem {
  [key: string]: string;
  lat: string;
  lng: string;
}

interface OpenDataResponse {
  data: OpenDataItem[];
}

<<<<<<< HEAD
const DetailPage: React.FC<DetailPageProps> = ({ open, onClose }) => {
  const router = useRouter();
  //리뷰혹은 북마크에서url로 보낸 위경도를 이코드에서 받아옵니다
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  //전체 데이터를 출력합니다
  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });
  if (isLoading) return <div>정보를 가져오고있습니다</div>;
  if (error) return <div>해당장소에대한 정보가 없습니다</div>;

  const dataList = data?.data;

  //리뷰 갯수와 별점 출력
  const [reviewNumber, setReviewNumber] = useState(0);
  const [reviewsStar, setReviewsStar] = useState(0);
  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const reviews = await reviewRoute();
        // 같은 위도와 경도를 가진 리뷰의 총 숫자 구하기
        const marchingNumber = reviews.filter(
          (review: { lat: string; lng: string }) =>
            review.lat === lat && review.lng === lng
        );
        const averageStar = marchingNumber.reduce(
          (sum: number, review: any) =>
            Math.round((sum + review.star) / marchingNumber.length),
          0
        );
        setReviewNumber(marchingNumber.length);
        setReviewsStar(averageStar);
      } catch (error) {
        console.error("리뷰데이터 연결실패", error);
      }
=======
const DetailPage: React.FC<DetailPageProps> = ({ open, onClose, item }) => {
    const isDesktop = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:600px)");
    const searchParams = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const [reviewNumber, setReviewNumber] = useState(0);
    const [reviewsStar, setReviewsStar] = useState(0);
    const [reviewsData, setReviewsData] = useState<any>();

    useEffect(() => {
        const fetchReviewsData = async () => {
            try {
                const reviews = await reviewRoute();
                const matchingReviews = reviews.filter(
                    (review: { lat: string; lng: string }) => review.lat === lat && review.lng === lng
                );
                const averageStar = matchingReviews.reduce(
                    (sum: number, review: any) => sum + review.star, 0
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

    const filteredData = lat && lng ? data?.data.filter((item) => item.위도 === lat && item.경도 === lng) : [];

    const keysToShow1 = [
        { text: "시설명" },
        { text: "기본 정보_장소설명" }
    ];
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

    const sortByOrder = (entries: [string, string][], keysOrder: { text: string }[]) => {
        return entries.sort(([keyA], [keyB]) => {
            const indexA = keysOrder.findIndex(entry => entry.text === keyA);
            const indexB = keysOrder.findIndex(entry => entry.text === keyB);
            return indexA - indexB;
        });
>>>>>>> 4b0d364b6beb97b6ba44283a489a8e0f9b05b603
    };
    fetchReviewsData();
  }, [lat, lng]);

<<<<<<< HEAD
  //위도경도를 통해 맞는 장소를 상세페이지에 출력
  const filteredData =
    lat && lng
      ? data?.data.filter((item) => item.위도 === lat && item.경도 === lng)
      : [];
  //해당 key들만 상세정보에 출력됩니다
  const keysToShow1 = ["시설명", "기본 정보_장소설명"];
  const keysToShow2 = [
    "도로명주소",
    "홈페이지",
    "전화번호",
    "운영시간",
    "휴무일",
    "주차 가능여부",
    "반려동물 제한사항",
    "장소(실내) 여부",
    "장소(실외) 여부",
  ];
  //원하는 key순서대로 출력을 위한 코드
  const sortByOrder = (entries: [string, string][], keysOrder: string[]) => {
    return entries.sort(([keyA], [keyB]) => {
      return keysOrder.indexOf(keyA) - keysOrder.indexOf(keyB);
    });
  };

  //리스트에서 업체 클릭시 상세정보를 불러오는 코드를 작성할 공간
  // 바로가기 처럼 같은 방법으로 정보를 보내 받아오고싶습니다.

  return (
    <>
      <Drawer
        open={open}
        sx={{
          "& .MuiBackdrop-root": {
            display: "none",
          },
        }}
      >
        <button onClick={onClose}>닫기</button>
        <Box sx={{ width: 300 }} role="presentation">
          <List>
            {/* 좋아요 기능 확인 */}
            {/* {dataList?.map((item) => {
                        return (
                            <>
                                <Card item={item} />
                            </>
                        );
                    })} */}
            {filteredData?.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  secondary={
                    <>
                      <div>
                        {sortByOrder(Object.entries(item), keysToShow1).map(
                          ([key, value], idx) => {
                            if (keysToShow1.includes(key)) {
                              return (
                                <>
                                  <div key={idx}>{String(value)}</div>
                                </>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                      <div>리뷰({reviewNumber})</div>
                      <div>{reviewsStar}점</div>
                      <Divider sx={{ my: 1 }} />
                      <div>
                        {sortByOrder(Object.entries(item), keysToShow2).map(
                          ([key, value], idx) => {
                            if (keysToShow2.includes(key)) {
                              return <div key={idx}>{String(value)}</div>;
                            }
                            return null;
                          }
                        )}
                      </div>
                      {/* <ReviewWrite /> */}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Divider />
        </Box>
      </Drawer>
    </>
  );
=======
    const starHandler = (starCount: number) => {
        const stars: any[] = [];
        for (let i = 0; i < starCount; i++)
            stars.push(
                <div className="text-yellow-200 inline-block" key={i}>
                    <FaStar />
                </div>
            );
        return stars;
    };

    return (
        <>
            {isDesktop && (
                <Drawer
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiBackdrop-root": {
                        display: "none",
                    },
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: 400,
                        bgcolor: "rgb(255 197 197)",
                        boxShadow: 24,
                        p: 4,
                        height: "100vh",
                        overflowY: 'auto',
                        "&::-webkit-scrollbar": {
                            width: '0px',
                        },
                        position: 'relative',
                    }}
                    role="presentation"
                >
                    <IconButton
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'white',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <List>
                            {filteredData?.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText
                                        secondary={
                                            <>
                                                <div
                                                    style={{ padding: '15px ' }}
                                                    className="border  bg-white flex flex-col items-center whitespace-normal">
                                                    <div>
                                                    <div style={{  display: 'flex', justifyContent: 'flex-end', alignItems:"flex-end",padding:"0" }}>
                                                        <LikeButton liked={true} item={filteredData[0]} />
                                                    </div>
                                                        {sortByOrder(Object.entries(item), keysToShow1).map(
                                                            ([key, value], idx) => {
                                                                const entry = keysToShow1.find(entry => entry.text === key);
                                                                    if (entry) {
                                                                    return (
                                                                        <div key={idx} >
                                                                            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                                                                                {key === '시설명' && item.시설명}
                                                                            </div>
                                                                            <div className="flex justify-center items-center">
                                                                                {key === '기본 정보_장소설명' && item['기본 정보_장소설명']}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'inline-flex' }}>
                                                        <div style={{ marginRight: "5px" }}>리뷰({reviewNumber})</div>|
                                                        <FaStar style={{ color: 'gold', marginLeft:7 }} />
                                                        <div style={{ marginLeft:3 }}>
                                                            {reviewsStar}점
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border mt-5 bg-white"
                                                    style={{padding:20}}
                                                >
                                                <div
                                                    style={{border: '1px solid #ffc5c5',
                                                            display: 'inline-block',
                                                            padding:'5px 15px',
                                                            borderTopLeftRadius:"20px",
                                                            borderBottomRightRadius:"20px",
                                                            background:"#ffc5c5"
                                                            }}>
                                                    상세정보
                                                </div>
                                                    {sortByOrder(Object.entries(item), keysToShow2).map(
                                                        ([key, value], idx) => {
                                                            const entry = keysToShow2.find(entry => entry.text === key);
                                                            if (entry) {
                                                                return (
                                                                    <div key={idx} className="flex items-center">
                                                                        <div style={{marginRight:10, color:'rgb(255 197 197)', fontSize:20}}>{entry.icon}</div>
                                                                        <div style={{margin:7}}>{String(value)}</div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        }
                                                    )}
                                                </div>

                                                <div className="border mt-5 bg-white">
                                                    <ReviewWrite filteredData={filteredData} />
                                                    <div style={{marginLeft:20,marginBottom:20,marginTop:20}}>
                                                        {Array.isArray(reviewsData) && reviewsData.length > 0 ? (
                                                            reviewsData.map((reviewData: any) => (
                                                                <div key={reviewData.id}>
                                                                    <div>{reviewData.user_id}</div>
                                                                    <div>{starHandler(reviewData.star)}</div>
                                                                    <div>{reviewData.content}</div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div style={{padding:10}}>리뷰가 없습니다.</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>

                    </Box>
                </Drawer>
            )}
            {/* 모바일 버전 */}
            {isMobile && (
                <Modal
                    open={open}
                    onClose={onClose}
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: "600px",
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        minWidth: "350px"
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: "rgb(255 197 197)",
                            boxShadow: 24,
                            p: 4,
                            position: 'relative',
                        }}
                    >
                        {/* 닫기 버튼 */}
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'white',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography >
                            {filteredData?.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText
                                        secondary={
                                            <>
                                                <div
                                                    style={{ padding: '15px ' }}
                                                    className="border  bg-white flex flex-col items-center whitespace-normal">
                                                    <div>
                                                    <div style={{  display: 'flex', justifyContent: 'flex-end', alignItems:"flex-end",padding:"0" }}>
                                                        <LikeButton liked={true} item={filteredData[0]} />
                                                    </div>
                                                        {sortByOrder(Object.entries(item), keysToShow1).map(
                                                            ([key, value], idx) => {
                                                                const entry = keysToShow1.find(entry => entry.text === key);
                                                                    if (entry) {
                                                                    return (
                                                                        <div key={idx} >
                                                                            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                                                                                {key === '시설명' && item.시설명}
                                                                            </div>
                                                                            <div className="flex justify-center items-center">
                                                                                {key === '기본 정보_장소설명' && item['기본 정보_장소설명']}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'inline-flex' }}>
                                                        <div style={{ marginRight: "5px" }}>리뷰({reviewNumber})</div>|
                                                        <FaStar style={{ color: 'gold', marginLeft:7 }} />
                                                        <div style={{ marginLeft:3 }}>
                                                            {reviewsStar}점
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border mt-5 bg-white"
                                                    style={{padding:20}}
                                                >
                                                <div
                                                    style={{border: '1px solid #ffc5c5',
                                                            display: 'inline-block',
                                                            padding:'5px 15px',
                                                            borderTopLeftRadius:"20px",
                                                            borderBottomRightRadius:"20px",
                                                            background:"#ffc5c5"
                                                            }}>
                                                    상세정보
                                                </div>
                                                    {sortByOrder(Object.entries(item), keysToShow2).map(
                                                        ([key, value], idx) => {
                                                            const entry = keysToShow2.find(entry => entry.text === key);
                                                            if (entry) {
                                                                return (
                                                                    <div key={idx} className="flex items-center">
                                                                        <div style={{marginRight:10, color:'rgb(255 197 197)', fontSize:20}}>{entry.icon}</div>
                                                                        <div style={{margin:7}}>{String(value)}</div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        }
                                                    )}
                                                </div>

                                                <div className="border mt-5 bg-white">
                                                    <ReviewWrite filteredData={filteredData} />
                                                    <div style={{marginLeft:20,marginBottom:20}}>
                                                        {Array.isArray(reviewsData) && reviewsData.length > 0 ? (
                                                            reviewsData.map((reviewData: any) => (
                                                                <div key={reviewData.id}>
                                                                    <div>{reviewData.user_id}</div>
                                                                    <div>{starHandler(reviewData.star)}</div>
                                                                    <div>{reviewData.content}</div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div style={{padding:10}}>리뷰가 없습니다.</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </Typography>
                    </Box>
                </Modal>
            )}
        </>
    );
>>>>>>> 4b0d364b6beb97b6ba44283a489a8e0f9b05b603
};

export default DetailPage;
