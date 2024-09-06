import React, { useState, useEffect, useRef } from "react";
import { getOpenData } from "../../utils/db/OpenApi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import StationSearch from "./StationSearch";
import Card from "../../components/Card/Card";
import { DetailPageProps, OpenDataResponse, OpenDataItem } from "./type";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import DetailPage from "../map/DetailPage";
import { useMapContext } from "../../contexts/MapContext";

const ListStation: React.FC<DetailPageProps> = ({ open, onClose }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<OpenDataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<OpenDataItem | null>(null);

  const { center, setCenter } = useMapContext();
  const mapRef = useRef<HTMLDivElement>(null);
  // 지도 인스턴스 관리
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);

  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // mapInstance가 없을 때만 초기화
      const mapInstance = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: 5,
      });
      // kakao.maps.Map 인스턴스를 별도로 저장
      mapInstanceRef.current = mapInstance;
    } else if (mapInstanceRef.current) {
      // 기존 지도 인스턴스가 있는 경우 중심 좌표만 업데이트
      mapInstanceRef.current.setCenter(
        new kakao.maps.LatLng(center.lat, center.lng)
      );
    }
  }, [center]);

  useEffect(() => {
    if (data?.data) {
      const filtered =
        lat && lng
          ? data.data.filter((item) => item.lat === lat && item.lng === lng)
          : data.data;

      setFilteredData(
        filtered.filter(
          (item) =>
            item.시설명?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.도로명주소?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, lat, lng, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCardClick = (item: OpenDataItem) => {
    const coordinates = {
      lat: item.위도,
      lng: item.경도,
    };

    setSelectedItem(coordinates);
    setCenter({ lat: parseFloat(item.위도), lng: parseFloat(item.경도) });
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {isDesktop && (
        <Drawer
          open={open}
          sx={{
            "& .MuiBackdrop-root": {
              display: "none",
            },
          }}
        >
          <Box sx={{ width: 300 }} role="presentation">
            <Box sx={{ textAlign: "right", padding: 2 }}>
              <IconButton
                aria-label="Drawer 닫기"
                onClick={onClose}
                sx={{
                  color: "primary.main",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box onClick={(event) => event.stopPropagation()}>
              <StationSearch onSearch={handleSearch} />
            </Box>

            <List>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item: OpenDataItem, index: number) => (
                  <ListItem
                    key={index}
                    disablePadding
                    onClick={() => handleCardClick(item)}
                  >
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
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              bgcolor: "background.paper",
              p: 2,
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <IconButton
                aria-label="Modal 닫기"
                onClick={onClose}
                sx={{
                  color: "primary.main",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box onClick={(event) => event.stopPropagation()} mb={2}>
              <StationSearch onSearch={handleSearch} />
            </Box>

            <List>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item: OpenDataItem, index: number) => (
                  <ListItem
                    key={index}
                    disablePadding
                    onClick={() => handleCardClick(item)}
                  >
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
        </Modal>
      )}

      {/* DetailPage 컴포넌트 표시 */}
      {selectedItem && (
        <DetailPage
          open={Boolean(selectedItem)}
          item={selectedItem}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
};

export default ListStation;
