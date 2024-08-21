import { Input } from "@mui/material";
import { useState } from "react";

const ReviewWrite = () => {
    //리뷰쓰기칸
    const [reviewInput, setReviewInput] = useState(false);
    const openInput=()=>{
        setReviewInput(true)
    }
    const closeInput=()=>{
        setReviewInput(false)
    }
    //별점추가칸
    //전체별점평균
    //모든 리뷰 리스트
    return ( <div>
        {reviewInput?
        <button onClick={closeInput}
        className="cursor-pointer ">
            - 리뷰닫기
        </button>
        :
            <button onClick={openInput}
                className="cursor-pointer ">
            +리뷰쓰기
            </button>
        }

        {reviewInput?
            <Input
                placeholder="리뷰를 작성하세요"
                style={{ border: "1px solid black", height: "70px", width: "80%" }}
                multiline/>
        :
            null
        }
        {reviewInput?
        <button onClick={closeInput}>완료</button>
        :
        null}

    </div> );
}

export default ReviewWrite;