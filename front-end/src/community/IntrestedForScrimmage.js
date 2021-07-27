import { Box, Button, CircularProgress, Grid, TextField, Typography } from "../ui";
import { useState } from "react";
import { StyledSlider } from "./StyledSlider";
import { post } from "../network";

export const IntrestedForScrimmage = ({
    scrimmage,
    organizationId,
    onClose = () => {
        console.log("close function");
    },
    onSuccess = () => {
        console.log("success function");
    },
}) => {
    const [skillLevel, setSkillLevel] = useState(4);
    const [contact, setContact] = useState("");
    const [note, setNote] = useState("");
    const [submitting, setSumbitting] = useState(false);

    const handleSubmit = async () => {
        if (!contact) {
            console.log("please enter you contact");
            return;
        }
        setSumbitting(true);
        try {
            const {
                data: { success },
            } = await post(`/api/scrimmage/${scrimmage._id}/${organizationId}/interested/`, {
                skillLevel,
                contact,
                note,
            });
            if (success) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
        setSumbitting(false);
    };

    return (
        <Box p={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' gutterBottom>
                        Please fill out these details
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={contact}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        label='Discord Contact'
                        onChange={(e) => setContact(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={note}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        label='Note'
                        onChange={(e) => setNote(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <Typography variant='subtitle2' gutterBottom>
                            Pick your teams skill level
                        </Typography>
                    </Box>
                    <StyledSlider value={skillLevel} setValue={setSkillLevel} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={submitting}
                        onClick={handleSubmit}
                        color='secondary'
                        variant='contained'>
                        {submitting ? <CircularProgress color='secondary' /> : "Submit"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
