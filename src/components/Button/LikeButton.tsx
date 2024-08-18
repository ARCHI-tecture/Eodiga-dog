"use client";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type ButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const LikeButton: React.FC<ButtonProps> = ({ onClick }) => {
    const [like, setLike] = useState(false);

    return (
        <IconButton aria-label="like" onClick={onClick}>
            {like ? (
                <FavoriteIcon className="text-main-pink" fontSize="large" />
            ) : (
                <FavoriteBorderIcon className="text-main-pink" fontSize="large" />
            )}
        </IconButton>
    );
};

export default LikeButton;
