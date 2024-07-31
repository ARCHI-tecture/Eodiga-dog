"use client";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton: React.FC = () => {
    const [like, setLike] = useState(false);

    return (
        <IconButton
            aria-label="like"
            onClick={() => {
                setLike(!like);
            }}
        >
            {like ? <FavoriteIcon className="text-main-pink" /> : <FavoriteBorderIcon className="text-main-pink" />}
        </IconButton>
    );
};

export default LikeButton;
