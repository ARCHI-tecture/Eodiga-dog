"use client";

import React from "react";
import { useMediaQuery } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const SideMenu: React.FC<SideMenuProps> = ({ selectPage, handleButtonClick }) => {
    const isDesktop = useMediaQuery("(min-width:600px)");

    const menuStyle = "w-full  flex justify-center items-center p-4";
    return (
        <>
            {isDesktop && (
                <>
                    <div className="w-1/4 h-screen bg-main-green text-main-pink text-2xl flex flex-col pt-14 max-w-80">
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
            )}
        </>
    );
};

export default SideMenu;
