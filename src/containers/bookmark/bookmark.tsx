import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button/Button";
import { bookmarkroute } from "../../app/bookmark/bookmarkroute";

interface Bookmark {
    key: number;
    shopname:string;
    location:string;
    type:string
    lat:number;
    lng:number;
}

const Bookmark:React.FC = () => {

    const { data, isLoading, error } = useQuery<Bookmark[]>({
        queryKey:['bookmarks'],
        queryFn:bookmarkroute,
    })

    if (isLoading) return <span>Loding...</span>;
    if (error) return <div>Error: {error.message}</div>;

    const handleMoveBtn = (lng: number | null, lat: number | null) => {
        if (lng !== null && lat !== null) {
          window.location.href = `/?lat=${lat}&lng=${lng}`;
        }else{
          alert("해당 장소가 존재하지않습니다")
        }
    };

    return (
        <div>
            <h1>즐겨찾기</h1>
            <ul>
                {data?.map((bookmark)=>(
                    <li key={bookmark.key}>
                        <div>{bookmark.shopname}</div>
                        <div>{bookmark.location}</div>
                        <div>{bookmark.type}</div>
                        <Button
                            variant="pink" width="w-40" border="rounded-2xl"
                            onClick={() => handleMoveBtn(bookmark.lng, bookmark.lat)}
                            >보러가기</Button>
                    </li>
                ))}
            </ul>
        </div>
        );
}

export default Bookmark;