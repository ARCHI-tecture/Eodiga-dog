import { useState } from "react";
import StarCount from "./StarCount";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useMediaQuery } from "@mui/material";
//렌더링이 오래걸림  재 확인해볼것 
interface Review {
    shopname: string;
    lat: number;
    lng: number;
    user_id: string;
    date: string;
    content: string;
    star: number;
}

interface reviewsDataProps {
    filteredData: any;
}

const ReviewWrite: React.FC<reviewsDataProps> = ({ filteredData }) => {
    const [text, setText] = useState("");
    const [starScore, setStarScore] = useState(0);
    const [reviewInput, setReviewInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 목록 상태 추가
    const isDesktop = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:600px)");

    const openInput = () => {
        setReviewInput(true);
    };

    const closeInput = () => {
        setReviewInput(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const onClick = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        closeInput();

        try {
            const newReview = await collectData();
            if (newReview) {
                setReviews((prevReviews) => [newReview, ...prevReviews]); // 새로운 리뷰를 추가
            }
            setText("");
            setStarScore(0);
        } catch (error) {
            console.error('데이터 수집 중 오류 발생:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDateToMySQL = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const collectData = async (): Promise<Review | undefined> => {
        try {
            const reviewData: Review = {
                shopname: filteredData[0].시설명,
                lat: filteredData[0].위도,
                lng: filteredData[0].경도,
                user_id: '1',
                date: formatDateToMySQL(new Date()),
                content: text,
                star: starScore
            };

            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (!res.ok) {
                throw new Error('서버 응답에 실패했습니다');
            }

            return reviewData;
        } catch (error) {
            console.error('데이터 수집 중 오류 발생:', error);
        }
    };

    return (
        <div>
            {reviewInput ? (
                <button onClick={closeInput}
                    className="m-5 cursor-pointer border border-[#ffc5c5] inline-block py-1 px-4 rounded-tl-2xl rounded-br-2xl bg-[#ffc5c5]">
                    <RemoveIcon className="text-lg" /> 리뷰닫기
                </button>
            ) : (
                <button onClick={openInput}
                    className="m-5 cursor-pointer border border-[#ffc5c5] inline-block py-1 px-4 rounded-tl-2xl rounded-br-2xl bg-[#ffc5c5]">
                    <AddIcon className="text-lg" />
                    리뷰쓰기
                </button>
            )}

            {/* 리뷰 입력 폼 */}
            {reviewInput && (
                <div>
                    <textarea
                        name="input"
                        value={text}
                        onChange={onChange}
                        placeholder="200자 내외로 작성해주세요"
                        className={`border ${isDesktop ? "w-72 ml-5" : "w-64 ml-3"} h-32 p-4 resize-none`}
                        rows={4}
                    />

                    <div className="flex items-center">
                        <div className={`${isDesktop ? "ml-4 mt-1 mr-7" : "ml-3 mt-1"}`}>
                            <StarCount
                                starScore={starScore}
                                onStarScoreChange={setStarScore}
                            />
                        </div>

                        <button
                            className="ml-4 mt-1"
                            onClick={onClick}
                            disabled={isSubmitting}
                        >
                            <BorderColorIcon />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ReviewWrite;
