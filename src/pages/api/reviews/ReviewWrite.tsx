import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import StarCount from "./StarCount";
import { CompletionTriggerKind } from "typescript";
import { ucs2 } from "punycode";
interface reviewsDataProps{
    filteredData:any
}
const ReviewWrite: React.FC<reviewsDataProps> = ({filteredData}) => {
    const [text,setText] = useState("")
    const [input, setInput] = useState("");
    const [starScore, setStarScore] = useState(0);
    const [splOnClick, setSplOnClick] = useState(false);

    //리뷰쓰기칸
    const [reviewInput, setReviewInput] = useState(false);
    const openInput=()=>{
        setReviewInput(true)
    }
    const closeInput=()=>{
        setReviewInput(false)
    }
    const onChange = (e:any) =>{
        setText(e.target.value)
    }
    const onClick = () =>{
        setInput(text)
        closeInput()
        collectData()
        setSplOnClick(true)
    }

    //작성한 리뷰 sql로전달 데이터 모음
    const formatDateToMySQL = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    // let currentId = 3;
    // const getNextId = () => {
    //     currentId += 1;
    //     return currentId;
    // };
    const collectData = async() => {
        try{
            const reviewData = {
                //openapi정보 = shopname,lat,lng
                shopname:filteredData[0].시설명,
                lat:filteredData[0].위도,
                lng:filteredData[0].경도,
                //로그인정보 = id+1,user_id
                user_id: '1', // 로그인구현되야 변경가능
                // id:getNextId(),
                //리뷰작성= date,content,star
                date: formatDateToMySQL(new Date()),
                content:input,
                star:starScore
            };

            // 서버로 데이터를 전송합니다
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
                type="text"
                name="input"
                onChange={onChange}
                placeholder="200자내외로 작성해주세요"
                style={{ border: "1px solid black", height: "70px", width: "80%"  }}
                multiline/>
        :
            null
        }

        {reviewInput?
            <StarCount starScore={starScore} onStarScoreChange={setStarScore}/>
            :
            null
        }

        {reviewInput?
        <button onClick={onClick}>등록</button>
        :
        null}

    </div> );
}

export default ReviewWrite;