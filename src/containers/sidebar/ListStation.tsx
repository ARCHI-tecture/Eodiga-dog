"use client";
import React, { useState, useEffect } from "react";
import { getOpenData } from "../../utils/db/OpenApi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import StationSearch from "./StationSearch";
import { Typography } from "@mui/material";

interface DetailPageProps {
  open: boolean;
  onClose: () => void;
}

interface OpenDataItem {
  [key: string]: string;
  lat: string;
  lng: string;
}

interface OpenDataResponse {
  data: OpenDataItem[];
}

interface Station {
  id: string;
  name: string;
  type: string;
  location: string;
}

const ListStation: React.FC<DetailPageProps> = ({ open, onClose }) => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stations, setStations] = useState<Station[]>([
    { id: "1", name: "Station A", type: "Type A", location: "Location A" },
    { id: "2", name: "Station B", type: "Type B", location: "Location B" },
    // 추가적인 station 데이터를 기본값으로 설정할 수 있습니다.
  ]);

  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredData =
    lat && lng
      ? data?.data.filter((item) => item.lat === lat && item.lng === lng)
      : [];

  const stopPropagation = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation();
  };

  const searchFilteredData = filteredData.filter((item) =>
    item.시설명.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const keysToShow = [
    "시설명",
    "기본정보_장소설명",
    "도로명주소",
    "홈페이지",
    "전화번호",
    "운영시간",
    "휴무일",
    "주차 가능여부",
    "반려동물 제한사항",
    "장소(실내) 여부",
    "장소(실외) 여부",
  ];

  return (
    <Drawer
      open={open}
      sx={{
        "& .MuiBackdrop-root": {
          display: "none",
        },
      }}
    >
      <Box sx={{ width: 300 }} role="presentation">
        {/* 닫기 버튼 추가 */}
        <Box sx={{ textAlign: "right", padding: 2 }}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: "primary.main",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 클릭 이벤트 전파를 막기 위해 onClick 및 onKeyDown 핸들러 추가 */}
        <Box onClick={stopPropagation} onKeyDown={stopPropagation}>
          <StationSearch onSearch={handleSearch} />
        </Box>

        <List>
          {searchFilteredData?.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={`Item ${index + 1}`}
                secondary={Object.entries(item).map(([key, value], idx) => {
                  if (keysToShow.includes(key)) {
                    return (
                      <div key={idx}>
                        <strong>{key}:</strong> {String(value)}
                      </div>
                    );
                  }
                  return null;
                })}
              />
            </ListItem>
          ))}
        </List>

        {/* Always Displayed Station List */}
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Stations</Typography>
          <List>
            {stations.map((station) => (
              <ListItem key={station.id}>
                <ListItemText
                  primary={station.name}
                  secondary={`Type: ${station.type}, Location: ${station.location}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ListStation;
