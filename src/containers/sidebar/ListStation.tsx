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

// DetailPage 컴포넌트 추가
const DetailPage: React.FC<{ item: OpenDataItem; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  return (
    <Modal
      open={!!item}
      onClose={onClose}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "80%",
        width: "80%",
        overflowY: "auto",
        bgcolor: "background.paper",
        p: 2,
      }}
    >
      <Box>
        <IconButton
          aria-label="닫기"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "primary.main" }}
        >
          <CloseIcon />
        </IconButton>
        <h2>{item.시설명}</h2>
        <p>{item.도로명주소}</p>
        {/* 추가적인 상세 정보 표시 */}
      </Box>
    </Modal>
  );
};

const ListStation: React.FC<DetailPageProps> = ({ open, onClose }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<OpenDataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<OpenDataItem | null>(null);

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
    setSelectedItem(item);
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
        <DetailPage item={selectedItem} onClose={handleCloseDetail} />
      )}
    </>
  );
};

export default ListStation;
