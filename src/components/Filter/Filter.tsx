import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BedIcon from "@mui/icons-material/Bed";
import Button from "../Button/Button";
import { Grid } from "@mui/material";

const Filter: React.FC = () => {
    const [filterVariant, setFilterVariant] = useState<number | null>(null);
    const isDesktop = useMediaQuery("(min-width:600px)");

    const filterList = [
        { name: "음식점", icon: <RestaurantIcon /> },
        { name: "카페", icon: <LocalCafeIcon /> },
        { name: "미용실", icon: <ContentCutIcon /> },
        { name: "병원", icon: <LocalHospitalIcon /> },
        { name: "여행", icon: <BedIcon /> },
    ];

    return (
        <Grid display="flex" className={`${isDesktop ? "" : "justify-center w-full"}`}>
            {isDesktop ? (
                <>
                    {filterList.map((filter, index) => (
                        <Grid className="m-1 mt-5 z-40" key={index}>
                            <Button
                                variant={filterVariant === index ? "green" : "white"}
                                border="rounded-3xl"
                                onClick={() => {
                                    setFilterVariant(index);
                                }}
                            >
                                {filter.icon}
                                {filter.name}
                            </Button>
                        </Grid>
                    ))}
                </>
            ) : (
                <Grid className="flex border border-gray rounded-xl mt-10 z-50">
                    {filterList.map((filter, index) => (
                        <Grid key={index}>
                            <Button
                                variant={filterVariant === index ? "pink" : "white"}
                                border={`${index === 0 && "rounded-l-xl"} ${index === 4 && "rounded-r-xl"} border-none`}
                                width="w-16"
                                height="h-16"
                                onClick={() => {
                                    setFilterVariant(index);
                                }}
                            >
                                {filter.icon}
                                {filter.name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default Filter;
