"use client";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BottomBar: React.FC = () => {
    const [value, setValue] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const router = useRouter();

    const bottomPStyle = `w-1/4 h-full flex justify-center items-center`;
    const bottomIconStyle = `text-5xl text-main-pink`;

    const handleRouter = (addr: string, icon: string) => {
        router.push(addr);
        setValue(icon);
    };

    return (
        <nav className="cursor-pointer fixed bottom-0 w-full h-24 flex items-center">
            <p
                onClick={() => handleRouter("/", "home")}
                className={`${bottomPStyle} ${value === "home" ? "bg-main-pink" : ""}`}
            >
                <HomeIcon className={`${bottomIconStyle} ${value === "home" ? "text-white " : ""}`} />
            </p>
            <p
                onClick={() => handleRouter("/like", "like")}
                className={`${bottomPStyle} ${value === "like" ? "bg-main-pink" : ""}`}
            >
                <FavoriteIcon className={`${bottomIconStyle} ${value === "like" ? "text-white" : ""}`} />
            </p>
            <p
                onClick={() => handleRouter("/review", "review")}
                className={`${bottomPStyle} ${value === "review" ? "bg-main-pink" : ""}`}
            >
                <FormatListBulletedIcon className={`${bottomIconStyle} ${value === "review" ? "text-white" : ""}`} />
            </p>
            {isLoggedIn ? (
                <p
                    onClick={() => {
                        router.push("/");
                        setIsLoggedIn(false);
                    }}
                    className={`${bottomPStyle} ${value === "logout" ? "bg-main-pink" : ""}`}
                >
                    <LogoutIcon className={`${bottomIconStyle} ${value === "logout" ? "text-white" : ""}`} />
                </p>
            ) : (
                <p
                    onClick={() => handleRouter("/login", "login")}
                    className={`${bottomPStyle} ${value === "login" ? "bg-main-pink" : ""}`}
                >
                    <LoginIcon className={`${bottomIconStyle} ${value === "login" ? "text-white" : ""}`} />
                </p>
            )}
        </nav>
    );
};

export default BottomBar;
