import { Box, Button, Grid, Typography } from "../ui";
import { NormaliseData } from "./NormaliseData";

export const CustomCharts = ({ customCharts, labels, setCustomCharts }) => {
    const removeChart = (chartToRemove) => {
        setCustomCharts(customCharts.filter((chart) => chart.id !== chartToRemove.id));
    };

    return (
        <Box my={3}>
            <Typography variant='h5' gutterBottom>
                Custom Charts
            </Typography>
            <Grid container>
                {customCharts.length > 0 ? (
                    customCharts.map((chartData, index) => (
                        <Grid item xs={12} key={chartData.id} md={6}>
                            <Box my={2}>
                                <Typography variant='h6' gutterBottom>
                                    Custom Chart-{index + 1}
                                </Typography>
                            </Box>
                            <NormaliseData
                                data={chartData.data}
                                normalizeData={true}
                                labels={labels}
                            />
                            <Box my={2}>
                                <Button
                                    onClick={() => removeChart(chartData)}
                                    color='primary'
                                    variant='outlined'>
                                    Remove Chart
                                </Button>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant='h6' gutterBottom>
                            No Custom Charts
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
