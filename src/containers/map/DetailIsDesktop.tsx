import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ReviewWrite from "../../pages/api/reviews/ReviewWrite";
import { FaStar } from "react-icons/fa";
import LikeButton from "../../components/Button/LikeButton";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
//디테일 페이지 데스크탑 버젼
const DetailIsDesktop: React.FC<DetailIsDesktopProps> = ({
  filteredData,
  sortByOrder,
  reviewNumber,
  reviewsStar,
  keysToShow1,
  keysToShow2,
  reviewsData,
  starHandler,
  drawerOpen,
  closeIcon
}) => {
  const item = filteredData?.[0] || {};
  const { data: session } = useSession();
  return (
    <div>
      <Drawer
        open={drawerOpen}
        sx={{
          "& .MuiBackdrop-root": {
            display: "none",
          },
          overflow: "hidden",
          maxWidth: '400px'
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "rgb(255 197 197)",
            boxShadow: 24,
            p: 4,
            height: "100vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            position: "relative",
          }}
          role="presentation"
        >
          <IconButton
            onClick={closeIcon}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {filteredData?.map((item:any, index:any) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  secondary={
                    <>
                     {/* 제 1박스 정보(이름,시설명) */}
                      <div
                        style={{ paddingBottom: "30px " }}
                        className="flex flex-col items-center whitespace-normal bg-white border"
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              padding: "0",
                              width: "300px",
                              fontSize: "20px",
                            }}
                          >
                            { session ?
                              <LikeButton liked={true} item={filteredData[0]} />
                              :
                              null
                            }
                          </div>
                          {sortByOrder(Object.entries(item), keysToShow1).map(
                            ([key, value], idx) => {
                              const entry = keysToShow1.find(
                                (entry) => entry.text === key
                              );
                              if (entry) {
                                return (
                                  <div key={idx}>
                                    <div
                                      className="flex items-center justify-center"
                                      style={{
                                        fontSize: "1.5rem",
                                        fontWeight:"bold",
                                        paddingTop:"10px"
                                      }}
                                    >
                                      {key === "시설명" && item.시설명}
                                    </div>
                                    <div className="flex items-center justify-center">
                                      {key === "기본 정보_장소설명" &&
                                        item["기본 정보_장소설명"]}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }
                          )}
                        </div>
                        <div style={{ display: "inline-flex" }}>
                          <div style={{ marginRight: "5px" }}>
                            리뷰({reviewNumber})
                          </div>
                          |
                          <FaStar style={{ color: "gold", marginLeft: 7 }} />
                          <div style={{ marginLeft: 3 }}>
                            {isNaN(reviewsStar) ? '0' : reviewsStar}점
                          </div>
                        </div>
                      </div>
                      <div
                        className="mt-5 bg-white border"
                        style={{ padding: 20 }}
                      >
                        {/* 제2박스 상세정보  */}
                        <div
                          style={{
                            border: "1px solid #ffc5c5",
                            display: "inline-block",
                            padding: "5px 15px",
                            borderTopLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
                            background: "#ffc5c5",
                          }}
                        >
                          상세정보
                        </div>
                        {sortByOrder(Object.entries(item), keysToShow2).map(
                          ([key, value], idx) => {
                            const entry = keysToShow2.find(
                              (entry) => entry.text === key
                            );
                            if (entry) {
                              return (
                                <div key={idx} className="flex items-center">
                                  <div
                                    style={{
                                      marginRight: 10,
                                      color: "rgb(255 197 197)",
                                      fontSize: 20,
                                    }}
                                  >
                                    {entry.icon}
                                  </div>
                                  <div style={{ margin: 7 }}>
                                    {String(value)}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                      {/* 제3 박스 리뷰쓰기와 리뷰리스트 */}
                      <div className="mt-5 bg-white border">
                        <ReviewWrite filteredData={filteredData} reviewsData={reviewsData} />
                        <div
                          style={{
                            marginLeft: 20,
                            marginBottom: 20,
                            marginTop: 20,
                          }}
                        >
                          {Array.isArray(reviewsData) && reviewsData.length > 0 ? (
                            reviewsData.map((reviewData) => (
                              <div key={reviewData.id} style={{ marginBottom: 20 }}>
                                <div className="font-bold">닉네임: {reviewData.user_id}</div>
                                <div>별점: {starHandler(reviewData.star)}</div>
                                <div>리뷰: {reviewData.content}</div>
                              </div>
                            ))
                          ) : (
                            <div style={{ padding: 10 }}>
                              리뷰가 없습니다.
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default DetailIsDesktop;
