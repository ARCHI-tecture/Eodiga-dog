"use client";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

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

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === "/") {
            setValue("home");
        } else if (currentPath === "/like") {
            setValue("like");
        } else if (currentPath === "/review") {
            setValue("review");
        } else if (currentPath === "/login") {
            setValue("login");
        }
    }, []);


    return (
        <nav className="cursor-pointer fixed bottom-0 w-full h-24 flex items-center z-40 ">
            <p
                onClick={() => handleRouter("/", "home")}
                className={`${bottomPStyle} ${value === "home" ? "bg-main-pink" : "bg-white"}`}
            >
                <HomeIcon className={`${bottomIconStyle} ${value === "home" ? "text-white " : "text-main-pink"}`} />
            </p>
            <p
                onClick={() => handleRouter("/like", "like")}
                className={`${bottomPStyle} ${value === "like" ? "bg-main-pink" : "bg-white"}`}
            >
                <FavoriteIcon className={`${bottomIconStyle} ${value === "like" ? "text-white" : "text-main-pink"}`} />
            </p>
            <p
                onClick={() => handleRouter("/review", "review")}
                className={`${bottomPStyle} ${value === "review" ? "bg-main-pink" : "bg-white"}`}
            >
                <FormatListBulletedIcon
                    className={`${bottomIconStyle} ${value === "review" ? "text-white" : "text-main-pink"}`}
                />
            </p>
            {isLoggedIn ? (
                <p
                    onClick={() => {
                        router.push("/");
                        setIsLoggedIn(false);
                    }}
                    className={`${bottomPStyle} ${value === "logout" ? "bg-main-pink" : "bg-white"}`}
                >
                    <LogoutIcon
                    onClick={() => {
                        signOut()
                    }}
                        className={`${bottomIconStyle} ${value === "logout" ? "text-white" : "text-main-pink"}`}
                    />
                </p>
            ) : (
                <p
                    onClick={() => handleRouter("/login", "login")}
                    className={`${bottomPStyle} ${value === "login" ? "bg-main-pink" : "bg-white"}`}
                >
                    <LoginIcon
                        className={`${bottomIconStyle} ${value === "login" ? "text-white" : "text-main-pink"}`}
                    />
                </p>
            )}
        </nav>
    );
};

export default BottomBar;
