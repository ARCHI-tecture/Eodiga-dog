"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
    const { data: session } = useSession();
    const [isCardVisible, setIsCardVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            cardRef.current &&
            !cardRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsCardVisible(false);
        }
    };

    useEffect(() => {
        if (isCardVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [isCardVisible]);

    const handleToggleCard = () => {
        setIsCardVisible((prevState) => !prevState);
    };

    const buttonStyle =
        "text-main-black text-md font-bold hover:border hover:border-black hover:rounded-3xl pl-5 pr-5 pt-2 pb-2 ";

    return (
        <div className="flex">
            <div className="bg-main-green fixed w-full h-16 z-40 flex justify-between items-center p-10">
                <Link href="/">
                    <h1 className="text-main-black text-xl">어디가개</h1>
                </Link>
                <div className="flex relative">
                    {session ? (
                        <>
                            <button
                                ref={buttonRef}
                                className="text-main-black text-md font-bold mr-12"
                                onClick={handleToggleCard}
                            >
                                {session.user?.name || "유저"}님
                            </button>
                            {isCardVisible && (
                                <div
                                    ref={cardRef}
                                    className="absolute top-14 right-2 bg-white shadow-md rounded-sm p-4 h-28"
                                >
                                    <div className="text-md">{session.user?.email}</div>
                                    <button
                                        className="text-sm mt-2 text-gray-500 font-bold hover:underline"
                                        onClick={() => signOut()}
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            )}
                            <Link href="/mypage">
                                <button className="text-main-black text-sm font-bold flex flex-col items-center">
                                    <PersonIcon />
                                    마이페이지
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className={`${buttonStyle} mr-5`}>로그인</button>
                            </Link>
                            <Link href="/signup">
                                <button className={buttonStyle}>회원가입</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="pb-20"></div> {/* 헤더 높이만큼 메인에 여백 */}
        </div>
    );
};

export default Header;
