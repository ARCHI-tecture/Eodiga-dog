"use client";
import Link from "next/link";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";


const Header: React.FC = () => {

    const { data: session } = useSession();
    
    console.log(session)
    const buttonStyle =
        "text-main-black text-md font-bold hover:border hover:border-black hover:rounded-3xl pl-5 pr-5 pt-2 pb-2 ";


    return (
        <div className="flex">
            <div className="bg-main-green fixed w-full h-16 z-40 flex justify-between items-center p-10">
                <Link href="/">
                    <h1 className="text-main-black text-xl">어디가개</h1>
                </Link>
                <div className="flex">
                    {session ? (
                        <>
                            <button className="text-main-black text-md font-bold mr-12">OO님</button>
                            <Link href="/mypage">
                                <button className="text-main-black text-sm font-bold flex flex-col items-center">
                                    <PersonIcon />
                                    마이페이지
                                </button>
                            </Link>
                            {/* 임시 로그아웃 버튼 */}
                            <button                    
                                onClick={() => {
                                    signOut()
                                }}>임시 로그아웃</button>
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
            <div className="pb-20"></div> {/* 헤더 높이만큼 메인에 여백  */}
        </div>
    );
};

export default Header;
