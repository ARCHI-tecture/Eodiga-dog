"use client";
import React from "react";
import Header from "./Header";
import { useMediaQuery } from "@mui/material";
import BottomBar from "./BottomBar";
import { MapProvider } from "../../contexts/MapContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <MapProvider>
        {isDesktop && <Header />}
        <main>{children}</main>
        {isMobile && <BottomBar />}
      </MapProvider>
    </>
  );
};

export default Layout;
