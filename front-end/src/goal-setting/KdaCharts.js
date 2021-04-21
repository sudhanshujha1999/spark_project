import { Divider, Grid, Typography, Box } from "../ui";
import { NormaliseData } from "./NormaliseData";
import { DoughnutChart } from "./DoughnutChart";
import { useEffect, useState } from "react";

export const KdaCharts = ({ dataToWork, labels }) => {
    const [data, setData] = useState();

    useEffect(() => {
        if (dataToWork) {
            setData(
                dataToWork.map((dataset) => {
                    let newDataWithFixedColor = { ...dataset };
                    if (newDataWithFixedColor.label === "Kills") {
                        newDataWithFixedColor.backgroundColor = "hsla(0, 90%, 65%, 0.4)";
                        newDataWithFixedColor.borderColor = "hsla(0, 90%, 65%, 1)";
                    }
                    if (newDataWithFixedColor.label === "Deaths") {
                        newDataWithFixedColor.backgroundColor = "hsla(220, 90%, 65%, 0.4)";
                        newDataWithFixedColor.borderColor = "hsla(220, 90%, 65%, 1)";
                    }
                    if (newDataWithFixedColor.label === "Assists") {
                        newDataWithFixedColor.backgroundColor = "hsla(90, 90%, 65%, 0.4)";
                        newDataWithFixedColor.borderColor = "hsla(90, 90%, 65%, 1)";
                    }
                    return newDataWithFixedColor;
                })
            );
        }
    }, [dataToWork]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='h5' gutterBottom>
                    KDA charts for last five matches
                </Typography>
                <Box my={3}>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <NormaliseData data={data} normalizeData={false} labels={labels} />
            </Grid>
            <Grid item xs={12} md={6}>
                <DoughnutChart data={data} neededDataLabels={["kills", "deaths", "assists"]} />
            </Grid>
        </Grid>
    );
};
