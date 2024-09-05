"use client";
import { IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LikeButtonProps } from "./type";
import { useQuery } from "@tanstack/react-query";
import Bookmark from "../../containers/bookmark/bookmark";
import { bookmarkroute } from "../../app/bookmark/bookmarkroute";
import { useSession } from "next-auth/react";

const LikeButton: React.FC<LikeButtonProps> = ({
  liked = false,
  item,
  removeBookmark,
}) => {
  const [like, setLike] = useState(liked);
  const { data: session } = useSession();

  const { data } = useQuery<Bookmark[]>({
    queryKey: ["bookmarks"],
    queryFn: bookmarkroute,
  });

  useEffect(() => {
    if (data && item) {
      const isLiked = data?.some(
        (ele) => ele.shopname === item.시설명 || ele.id === item.id
      );
      setLike(!!isLiked);
    }
  }, [data, item]);

  const handleFavorite = async () => {
    try {
      setLike((prevLike) => !prevLike);

      const likedItem = {
        id: item?.id,
        shopname: item?.시설명,
        location: item?.["시군구 명칭"]
          ? item?.["시군구 명칭"]
          : item?.["시도 명칭"],
        type: item?.["기본 정보_장소설명"],
        user_id: session?.user?.name ?? "unknown",
        lat: item?.위도,
        lng: item?.경도,
      };

      // 요청 타입 설정
      const method = like ? "DELETE" : "POST";

      // 서버로 데이터 전송
      const response = await fetch("/api/bookmark", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likedItem),
      });

      if (!response.ok) {
        throw new Error("좋아요 처리 중 오류가 발생했습니다.");
      }

      if (removeBookmark && method === "DELETE") {
        removeBookmark(item?.id);
      }
    } catch (error) {
      setLike((prevLike) => !prevLike);
    }
  };

  return (
    <IconButton aria-label="like" onClick={handleFavorite}>
      {like ? (
        <FavoriteIcon className="text-main-pink" fontSize="large" />
      ) : (
        <FavoriteBorderIcon className="text-main-pink" fontSize="large" />
      )}
    </IconButton>
  );
};

export default LikeButton;
