import { FaRegStar, FaStar } from 'react-icons/fa'
interface StarCountProps {
    starScore: number;                 // 부모로부터 전달받을 별점 값
    onStarScoreChange: (score: number) => void; // 부모 컴포넌트에 별점 값을 전달할 함수
}
//리뷰작성시 별점 누를시 해당 숫자만크 별의 색을 변경 
const StarCount: React.FC<StarCountProps> = ({ starScore, onStarScoreChange }) => {
    const ratingStarHandler = ():number[] => {
        let result:any[] = [];
        for (let i:number=0; i<5; i++){
            result.push(
                <span key={i+1} onClick={()=>onStarScoreChange (i+1)}>
                    {
                        i+1 <= starScore ?
                        <FaStar className='star text-yellow-200 size-6 inline-block '/>
                        :
                        <FaRegStar className='star size-6 inline-block'/>
                    }
                </span>
            )
        } return result
    }

    return (
            <div className='ml-3 mt-1' >
                {ratingStarHandler()}
            </div>
    );
}

export default StarCount;