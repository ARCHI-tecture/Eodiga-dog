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
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";

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

  const { data, isLoading, error } = useQuery<OpenDataResponse>({
    queryKey: ["openData", lat, lng],
    queryFn: () => getOpenData(lat, lng),
  });

  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;

      if (filterCategory) {
        filtered = filtered.filter((item) =>
          item.카테고리2?.toLowerCase().includes(filterCategory.toLowerCase())
        );
      }

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
  // console.log(filtered.filter);
  console.log(data?.data);

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
        </Modal>
      )}
    </>
  );
};

export default ListStation;
