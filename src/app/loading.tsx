import React, { useMemo } from "react";
import { Grid } from "@mui/material";

const Loading: React.FC = () => {
    const randomNum = useMemo(() => Math.floor(Math.random() * 7) + 1, []);

    return (
        <Grid
            container
            direction="column"
            className="bg-main-green w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center"
        >
            <img src={`dog${randomNum}.png`} width="300" height="300" className="mb-5 rounded-full" />
            <p className="text-5xl font-bold">어디가개</p>
        </Grid>
    );
};

export default Loading;
