"use client";
import React from "react";
import Header from "./Header";
import { useMediaQuery } from "@mui/material";
import BottomBar from "./BottomBar";
import { MapProvider } from "../../contexts/MapContext";
import { SessionProvider } from "next-auth/react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
    <SessionProvider>
      <MapProvider>
        {isDesktop && <Header />}
        <main>{children}</main>
        {isMobile && <BottomBar />}
      </MapProvider>
    </SessionProvider>
    </>
  );
};

export default Layout;
