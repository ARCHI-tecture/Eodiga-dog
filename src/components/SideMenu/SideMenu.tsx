"use client";

import React from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const SideMenu: React.FC<SideMenuProps> = ({ selectPage, handleButtonClick }) => {
    const menuStyle = "w-full flex justify-center items-center p-4";
    return (
        <>
            <>
                <div className="fixed left-0 w-1/5 h-full bg-main-green text-main-pink text-2xl flex flex-col pt-20 max-w-96 min-w-40">
                    <div className={`${menuStyle} ${selectPage === "reviews" && "bg-white"}`}>
                        <div onClick={() => handleButtonClick("reviews")} className="">
                            <FormatListBulletedIcon sx={{ fontSize: "30px", marginRight: "5px" }} />내 리뷰
                        </div>
                    </div>

                    <div className={`${menuStyle} ${selectPage === "bookmark" && "bg-white"}`}>
                        <div onClick={() => handleButtonClick("bookmark")}>
                            <FavoriteBorderIcon sx={{ fontSize: "30px", marginRight: "5px" }} />
                            즐겨찾기
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default SideMenu;
