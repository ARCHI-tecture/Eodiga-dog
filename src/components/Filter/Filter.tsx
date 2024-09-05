import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BedIcon from "@mui/icons-material/Bed";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "../Button/Button";
import ListStation from "../../containers/sidebar/ListStation";

const Filter: React.FC<{ setFilterCategory: (category: string) => void }> = ({
  setFilterCategory,
}) => {
  const [filterVariant, setFilterVariant] = useState<number | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const filterList = [
    { name: "식당", icon: <RestaurantIcon /> },
    { name: "카페", icon: <LocalCafeIcon /> },
    { name: "미용실", icon: <ContentCutIcon /> },
    { name: "병원", icon: <LocalHospitalIcon />, category: "일반동물병원" },
    { name: "여행", icon: <BedIcon />, category: "공원" },
  ];

  const handleToggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleFilterClick = (index: number, category: string) => {
    setFilterVariant(index);
    setCurrentCategory(category);
    setFilterCategory(category);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item>
          <IconButton onClick={handleToggleList}>
            {isListOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Grid>

        {filterList.map((filter, index) => (
          <Grid className="m-1 mt-5 z-40" key={index}>
            <Button
              variant={filterVariant === index ? "green" : "white"}
              onClick={() =>
                handleFilterClick(index, filter.category || filter.name)
              }
            >
              {filter.icon}
              {filter.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {isListOpen && (
        <div className="absolute top-0 left-0 z-50">
          <ListStation
            open={isListOpen}
            onClose={handleToggleList}
            filterCategory={currentCategory}
          />
        </div>
      )}
    </>
  );
};

export default Filter;
