import { Typography, Box, Button, Dialog, Checkbox, TextField, Autocomplete } from "../ui";
import { useState, useEffect } from "react";
import { useStyles } from "./styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export const AddCustomCharts = ({ data, setCharts }) => {
    const classes = useStyles();
    const [selectLabels, setSelectLables] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [labelsForCustomChart, setLabelsForCustomChart] = useState([]);

    useEffect(() => {
        if (data) {
            setSelectLables(data.map((dataset) => dataset.label));
        }
    }, [data]);

    const onClose = () => {
        setLabelsForCustomChart([]);
        setOpenDialog(false);
    };

    const addChart = () => {
        const customCharts = data.filter((dataset) => labelsForCustomChart.includes(dataset.label));
        if (customCharts.length > 0) {
            const chartId = Math.floor(100000000 + Math.random() * 900000000);
            setCharts((prevState) => [
                ...prevState,
                {
                    id: chartId,
                    data: customCharts,
                },
            ]);
        }
        onClose();
    };

    return (
        <Box>
            <Box my={5}>
                <Typography variant='h5' gutterBottom>
                    Add custom charts for more stats
                </Typography>
                <Button onClick={() => setOpenDialog(true)} variant='outlined' color='secondary'>
                    Add Chart
                </Button>
                <Dialog open={openDialog} onClose={onClose}>
                    <Box className={classes.dialog}>
                        <Typography variant='h5'>Add the tags you want in the chart</Typography>
                        <Box my={4}>
                            <Autocomplete
                                multiple
                                onChange={(e, data) => setLabelsForCustomChart(data)}
                                id='checkboxes'
                                options={selectLabels}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                renderOption={(option, { selected }) => (
                                    <>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant='outlined'
                                        label='Checkboxes'
                                        placeholder='Stats'
                                    />
                                )}
                            />
                        </Box>
                        <Box my={4}>
                            <Button onClick={addChart} color='secondary' variant='outlined'>
                                Add chart
                            </Button>
                        </Box>
                    </Box>
                </Dialog>
            </Box>
        </Box>
    );
};

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
