'use client';
import React, { useEffect, useState } from 'react';
import { getOpenData } from '../../utils/db/OpenApi';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import ReviewWrite from '../../pages/api/reviews/ReviewWrite';
import { reviewRoute } from '../../pages/api/reviews/reviewroute';
//한것: 보러가기 클릭시  위도와 경도를 이용하여 해당 상세정보에 데이터를 출력했습니다.
    //ex)http://localhost:3000/?lat=35.20243110&lng=127.601196
    //대신 리뷰와 즐겨찾기(북마크)db에 lat,lng컬럼을 추가하여야합니다.
//예림: 즐겨찾기(북마크)연결할때 컬럼 추가 해주세요
//해야할것: 리스트에서 업체를 클릭하면 해당 업체를 상세페이지에 출력하기
//데이터를 모두 위도와 경도를 기준으로 출력 하면 좋을거같음
interface DetailPageProps {
    open: boolean;
    onClose: ()=>void;
}

interface OpenDataItem {
    [key: string]: string;
    lat: string;
    lng: string;
}

interface OpenDataResponse {
    data: OpenDataItem[];
}


const DetailPage: React.FC<DetailPageProps> = ({ open, onClose }) => {
    const router = useRouter();
    //리뷰혹은 북마크에서url로 보낸 위경도를 이코드에서 받아옵니다
    const searchParams = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    //전체 데이터를 출력합니다
    const { data, isLoading, error } = useQuery<OpenDataResponse>({
        queryKey: ['openData', lat, lng],
        queryFn: () => getOpenData(lat, lng),
    });
    if (isLoading) return <div>정보를 가져오고있습니다</div>;
    if (error) return <div>해당장소에대한 정보가 없습니다</div>;

    //리뷰 갯수와 별점 출력
    const [reviewNumber, setReviewNumber] = useState(0);
    const [reviewsStar, setReviewsStar] = useState(0);
    useEffect(() => {
        const fetchReviewsData = async () => {
            try {
                const reviews = await reviewRoute();
                // 같은 위도와 경도를 가진 리뷰의 총 숫자 구하기
                const marchingNumber = reviews.filter((review: {lat:string, lng:string})=>
                    review.lat === lat && review.lng === lng
                )
                const averageStar = marchingNumber.reduce((sum:number,review:any)=>Math.round((sum + review.star)/marchingNumber.length), 0)
                setReviewNumber(marchingNumber.length)
                setReviewsStar(averageStar)
            } catch (error) {
                console.error('리뷰데이터 연결실패', error);
            }
        };
        fetchReviewsData();
    }, [lat, lng]);

    //위도경도를 통해 맞는 장소를 상세페이지에 출력
    const filteredData = lat && lng
        ? data?.data.filter(item => item.위도 === lat && item.경도 === lng)
        : [];
    //해당 key들만 상세정보에 출력됩니다
    const keysToShow1=[
        '시설명','기본 정보_장소설명',
    ]
    const keysToShow2 = [
        '도로명주소', '홈페이지', '전화번호',
        '운영시간', '휴무일', '주차 가능여부', '반려동물 제한사항',
        '장소(실내) 여부', '장소(실외) 여부'
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
                '& .MuiBackdrop-root': {
                    display: 'none',
                },
            }}
        >
            <button onClick={onClose}>닫기</button>
            <Box
                sx={{ width: 300 }}
                role="presentation"
            >
                <List>
                    {filteredData?.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                secondary={
                                    <>
                                        <div>
                                            {sortByOrder(Object.entries(item), keysToShow1).map(([key, value], idx) => {
                                                if (keysToShow1.includes(key)) {
                                                    return (
                                                        <>
                                                            <div key={idx}>
                                                                {String(value)}
                                                            </div>
                                                        </>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                        <div>리뷰({reviewNumber})</div>
                                        <div>{reviewsStar}점</div>
                                        <Divider sx={{ my: 1 }} />
                                        <div>
                                            {sortByOrder(Object.entries(item), keysToShow2).map(([key, value], idx) => {
                                                if (keysToShow2.includes(key)) {
                                                    return (
                                                        <div key={idx}>
                                                            {String(value)}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                        <ReviewWrite/>
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
}

export default DetailPage;
