import React from "react";
import mysql from "mysql";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button/Button";
import { bookmarkroute } from "../../app/bookmark/bookmarkroute";
import LikeButton from "../../components/Button/LikeButton";
import { PoolConnection } from "mysql";
import { getConnection, query } from "../../app/api/db";

interface Bookmark {
    key: number;
    shopname: string;
    location: string;
    type: string;
}

const Bookmark: React.FC = () => {
    const { data, isLoading, error } = useQuery<Bookmark[]>({
        queryKey: ["bookmarks"],
        queryFn: bookmarkroute,
    });

    console.log(data);

    if (isLoading) return <span>Loding...</span>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">즐겨찾기</h1>
            <ul className="p-10">
                {data && data?.length > 0 ? (
                    data?.map((bookmark) => (
                        <li
                            key={bookmark.key}
                            className="flex items-center justify-between pt-5 pb-2"
                            style={{ borderBottom: "1px solid #FFC5C5" }}
                        >
                            <div className="flex font-bold">
                                <div>{bookmark.shopname}</div>
                                <div>{`(${bookmark.location}, ${bookmark.type})`}</div>
                            </div>
                            <div className="flex">
                                <Button variant="pink">보러가기</Button>
                                <LikeButton />
                            </div>
                        </li>
                    ))
                ) : (
                    <div>즐겨찾기가 없습니다.</div>
                )}
            </ul>
        </div>
    );
};

export default Bookmark;
