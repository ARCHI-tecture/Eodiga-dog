"use client";
import React, { useState, useEffect } from "react";
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

const ListStation: React.FC<DetailPageProps> = ({ open, onClose }) => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<OpenDataItem[]>([]);

  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });

  useEffect(() => {
    if (data?.data) {
      const filtered =
        lat && lng
          ? data.data.filter((item) => item.lat === lat && item.lng === lng)
          : data.data;

      setFilteredData(
        filtered.filter((item) =>
          item.시설명.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, lat, lng, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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

        <Box onClick={(event) => event.stopPropagation()}>
          <StationSearch onSearch={handleSearch} />
        </Box>

        <List>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item: OpenDataItem, index: number) => (
              <ListItem key={index} disablePadding>
                <Card item={item} />
              </ListItem>
            ))
          ) : (
            <ListItem disablePadding>
              <div>No results found.</div>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default ListStation;
