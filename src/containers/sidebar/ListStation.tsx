"use client";
import React, { useState, useEffect, useRef } from "react";
import { getOpenData } from "../../utils/db/OpenApi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import StationSearch from "./StationSearch";
import Card from "../../components/Card/Card";
import { DetailPageProps, OpenDataResponse, OpenDataItem } from "./type";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import ScrollTopButton from "./ScrollTopButton";

const ListStation: React.FC<DetailPageProps & { filterCategory: string }> = ({
  open,
  onClose,
  filterCategory,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<OpenDataItem[]>([]);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });

  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;

      // 음식점 카테고리 필터링
      if (filterCategory === "식당") {
        filtered = filtered.filter((item) =>
          ["식당"].includes(item.카테고리3?.trim())
        );
      } else if (filterCategory === "카페") {
        filtered = filtered.filter((item) => item.카테고리3?.trim() === "카페");
      }
      // 미용실 카테고리 필터링
      else if (filterCategory === "미용실") {
        filtered = filtered.filter(
          (item) => item.카테고리2?.trim() === "반려동물 서비스"
        );
      }
      // 병원 카테고리 필터링
      else if (filterCategory === "병원") {
        filtered = filtered.filter((item) =>
          ["반려의료", "위탁관리"].includes(item.카테고리2?.trim())
        );
      }
      // 여행 카테고리 필터링
      else if (filterCategory === "여행") {
        filtered = filtered.filter(
          (item) => item.카테고리2?.trim() === "반려동반여행"
        );
      }

      // searchQuery 필터링
      if (searchQuery) {
        filtered = filtered.filter(
          (item) =>
            item.시설명?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.도로명주소?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredData(filtered);
    }
  }, [searchQuery, lat, lng, data, filterCategory]);

  const scrollToTopD = () => {
    const scrollableElement =
      document.querySelector(".MuiModal") ||
      document.querySelector(".MuiDrawer-paper");
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTopM = () => {
    if (isMobile && modalContentRef.current) {
      // Mobile modal의 콘텐츠 부분을 참조하여 스크롤
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Desktop Drawer 또는 다른 경우
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      {isDesktop && (
        <Drawer
          open={open}
          sx={{
            "& .MuiBackdrop-root": {
              display: "none",
            },
            "& .MuiDrawer-paper": {
              pointerEvents: "auto", // Drawer 내부의 포인터 이벤트 활성화
            },
            pointerEvents: "none", // Drawer 외부의 포인터 이벤트 차단
          }}
        >
          <Box
            sx={{ width: 300, paddingTop: 2, pointerEvents: "auto" }}
            role="presentation"
          >
            <Box onClick={(event) => event.stopPropagation()}>
              <StationSearch onSearch={setSearchQuery} />
            </Box>
            <List>
              {filteredData.length > 0 ? (
                filteredData.map((item: OpenDataItem, index: number) => (
                  <ListItem key={index} disablePadding>
                    <Card item={item} />
                  </ListItem>
                ))
              ) : (
                <ListItem disablePadding>
                  <div>결과를 찾을 수 없습니다.</div>
                </ListItem>
              )}
            </List>
          </Box>
          <ScrollTopButton
            onClick={scrollToTopD}
            sx={{
              position: "fixed",
              right: "1150px",
              bottom: "20px",
              zIndex: 1000,
            }}
          />
        </Drawer>
      )}
      {isMobile && (
        <Modal
          open={open}
          onClose={onClose}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "600px",
            overflowY: "auto",
            overflowX: "hidden",
            minWidth: "350px",
            pointerEvents: "none", // 모달 외부의 포인터 이벤트 차단
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%", // 전체 높이 사용
              bgcolor: "background.paper",
              p: 2,
              pointerEvents: "auto", // 모달 내부의 포인터 이벤트 활성화
              overflowY: "auto", // 스크롤 활성화
            }}
          >
            <Box onClick={(event) => event.stopPropagation()} mb={2}>
              <StationSearch onSearch={setSearchQuery} />
            </Box>

            <List>
              {filteredData.length > 0 ? (
                filteredData.map((item: OpenDataItem, index: number) => (
                  <ListItem key={index} disablePadding>
                    <Card item={item} />
                  </ListItem>
                ))
              ) : (
                <ListItem disablePadding>
                  <div>결과를 찾을 수 없습니다.</div>
                </ListItem>
              )}
            </List>

            <ScrollTopButton
              onClick={scrollToTopM}
              sx={{
                position: "fixed",
                bottom: "40px",
                right: "30px",
                zIndex: 1000,
              }}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ListStation;
