import { post } from "../network";
import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "../ui";
import { useStyles } from "./styles";

export const GroupBulletin = ({
    bulletins = [],
    groupId,
    updateDetails = () => console.log("update-function"),
}) => {
    const classes = useStyles();
    const [showAdd, setShowAdd] = useState(false);
    const [value, setValue] = useState("");
    const handleAdd = async () => {
        if (!showAdd) {
            setShowAdd(true);
        } else {
            // do the async call
            if (value.length > 150) {
                console.log("Too many characters");
                return;
            }
            const { data } = await post(`/api/${groupId}/bulletin/`, {
                bulletinValue: value,
            });
            if (data.success) {
                updateDetails();
            }
            setValue("");
            setShowAdd(false);
        }
    };

    return (
        <Card className={classes.membersBox}>
            <Typography className={classes.smallHeading}>Bulletins</Typography>
            <Box mt={2}>
                {bulletins.length > 0 ? (
                    bulletins.map((bulletin) => (
                        <Typography key={bulletin._id} variant='subtitle2' gutterBottom>
                            {bulletin.value}
                        </Typography>
                    ))
                ) : (
                    <Typography variant='subtitle2'>No bulletins</Typography>
                )}
            </Box>

            <Box mt={1} display='flex' flexDirection='column'>
                {showAdd && (
                    <Box my={1}>
                        <TextField
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            variant='outlined'
                            fullWidth
                            color='secondary'
                            multiline
                            rows={2}
                        />
                    </Box>
                )}
                <Box>
                    <Button onClick={handleAdd} variant='contained' color='primary'>
                        Add
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};
