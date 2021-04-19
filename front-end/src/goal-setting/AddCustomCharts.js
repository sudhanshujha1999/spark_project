import { Typography, Box, Button, Dialog, Checkbox, TextField, Autocomplete } from "../ui";
import { useState, useEffect } from "react";
import { useStyles } from "./styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export const AddCustomCharts = ({ data }) => {
    const classes = useStyles();
    const [selectLabels, setSelectLables] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (data) {
            setSelectLables(data.map((dataset) => dataset.label));
        }
    }, [data]);

    const onClose = () => {
        setOpenDialog(false);
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
                                onChange={(e, data) => console.log(data)}
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
                    </Box>
                </Dialog>
            </Box>
        </Box>
    );
};

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
