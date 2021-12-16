import { Box, Button, DatesBoilerPlate, Grid, MenuItem, TextField } from "../ui";
import { useState } from "react";
import DatePicker from "@material-ui/lab/DatePicker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { setEditTournamentValuesState, tournamentState } from "./recoil";
import { useEffect } from "react";
import { useCallback } from "react";

export const SchedulingSettingsInput = ({ saveFunction }) => {
    const { reporting_time: initialReportingTime, start_date: initialStartDate } =
        useRecoilValue(tournamentState);
    const [reportingTime, setReportingTime] = useState(initialReportingTime || new Date());
    const [date, setDate] = useState(initialStartDate);
    const setEditValues = useSetRecoilState(setEditTournamentValuesState);

    const handleChangeGlobalState = useCallback(
        (value, fieldName) => {
            if (!fieldName) {
                console.log("no-name-for-field");
            }
            setEditValues({ name: fieldName, value });
        },
        [setEditValues]
    );

    const handleReportingTime = useCallback(
        (value) => {
            setReportingTime(value);
            handleChangeGlobalState(value, "reporting_time");
        },
        [handleChangeGlobalState]
    );

    const handleDateChange = useCallback(
        (value) => {
            setDate(value);
            handleChangeGlobalState(value, "start_date");
        },
        [handleChangeGlobalState]
    );

    const handleSave = () => {
        console.log("scheduling");
        saveFunction();
    };

    useEffect(() => {
        if (!initialStartDate) {
            handleDateChange(new Date());
        } else {
            setDate(initialStartDate || new Date());
        }
        setReportingTime(initialReportingTime);
    }, [initialReportingTime, initialStartDate, handleDateChange]);

    return (
        <Box maxWidth='500px'>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <DatesBoilerPlate>
                        <DatePicker
                            label='Start Date'
                            value={date}
                            required
                            onChange={(newValue) => {
                                handleDateChange(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </DatesBoilerPlate>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='outlined-select-currency'
                        select
                        label='Reporting time'
                        value={reportingTime}
                        onChange={(e) => handleReportingTime(e.target.value)}
                        fullWidth>
                        {reportingTimeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSave} color='primary' variant='contained'>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

const reportingTimeOptions = [
    {
        label: "5 Minutes Before Start",
        value: 5,
    },
    {
        label: "15 Minutes Before Start",
        value: 15,
    },
    {
        label: "30 Minutes Before Start",
        value: 30,
    },
];
