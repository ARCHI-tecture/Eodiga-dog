"use client";
import React from "react";
import Header from "./Header";
import { useMediaQuery } from "@mui/material";
import BottomBar from "./BottomBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isDesktop = useMediaQuery("(min-width:600px)");
    return (
        <>
            {isDesktop ? <Header /> : <BottomBar />}
            <main>{children}</main>
        </>
    );
};

export default Layout;
