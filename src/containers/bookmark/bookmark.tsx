import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button/Button";
import { bookmarkroute } from "../../app/bookmark/bookmarkroute";
import LikeButton from "../../components/Button/LikeButton";
import { useMediaQuery } from '@mui/material';
import { useMapContext } from "../../contexts/MapContext";
import { useSession } from "next-auth/react";
import MoveBtn from "../../components/Button/MoveBtn";


const Bookmark: React.FC = () => {
  const { data: session } = useSession();
    const isDesktop = useMediaQuery("(min-width:600px)");

    const { data, isLoading, error } = useQuery<Bookmark[]>({
        queryKey: ["bookmarks"],
        queryFn: bookmarkroute,
    });

  useEffect(() => {
    if (data) {
      setBookmarks(data);
    }
  }, [data]);

  const fitered = data?.filter((item)=>item.user_id === session?.user?.name)
  const { setCenter } = useMapContext();
  const [bookmarks, setBookmarks] = useState<Bookmark[] | undefined>([]);

  if (isLoading)
    return <span>즐겨찾기를 불러오고있습니다. 잠시만 기다려주세요...</span>;
  if (error) return <div>Error: {error.message}</div>;

  //즐겨찾기 삭제하기버튼
  const removeBookmark = (id: number): void => {
    setBookmarks(
      (prevBookmarks) =>
        prevBookmarks && prevBookmarks.filter((bookmark) => bookmark.id !== id)
    );
  };

  return (
    <div className={`p-10`}>
        <h1 className={`text-2xl font-bold ${isDesktop ? "" : "flex justify-center"}`}>즐겨찾기</h1>
        <ul className={`p-10`} style={{ paddingBottom: '96px' }}>
            {fitered && fitered?.length > 0 ? (
                fitered?.map((bookmark) => {
                    return (
                        <li
                            key={bookmark.id}
                            className="flex items-center justify-between pt-5 pb-2"
                            style={{ borderBottom: "1px solid #FFC5C5" }}
                        >
                            <div className={`flex font-bold ${isDesktop ? "" : "text-sm"}`}>
                                <div>{bookmark.shopname}</div>
                                <div>{`(${bookmark.location}, ${bookmark.type})`}</div>
                            </div>
                            <div className="flex">
                              {/* DS - 보러가기 컴포넌트를 만들었습니다 */}
                                <MoveBtn lat={bookmark.lat} lng={bookmark.lng} isDesktop={isDesktop} />
                                <LikeButton liked={true} item={bookmark} removeBookmark={removeBookmark} />
                            </div>
                        </li>
                    );
                })
            ) : (
                <div>즐겨찾기가 없습니다.</div>
            )}
        </ul>
    </div>
);
};

export default Bookmark;
