import { useState, useEffect } from "react";
import { Autocomplete, Box, Button, Checkbox, TextField, Typography } from "../ui";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export const TeamPlayerSelect = ({ team, userId, setInvitees, invitees }) => {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    useEffect(() => {
        if (team.players.length > 0 || team.admins.length > 1) {
            const allMembers = {};
            team.players.forEach((player) => {
                if (player.id !== userId) {
                    if (!allMembers[player.id]) {
                        allMembers[player.id] = player;
                    }
                }
            });
            team.admins.forEach((admin) => {
                if (admin.id !== userId) {
                    if (!allMembers[admin.id]) {
                        allMembers[admin.id] = admin;
                    }
                }
            });
            const selectAll = {
                id: "000",
                value: "SELECT_ALL",
                name: "Select All",
            };
            setMembers([selectAll, ...Object.values(allMembers)]);
        }
    }, [team, userId]);

    const addPlayers = () => {
        const playersToAdd = selectedMembers.filter(
            (member) =>
                member.id !== "000" &&
                invitees.filter((invitee) => invitee.id === member.id).length === 0
        );
        setInvitees([...invitees, ...playersToAdd]);
    };

    return (
        <Box ml={3}>
            <Box my={1}>
                <Typography variant='subtitle2' gutterBottom>
                    {team.name}
                </Typography>
            </Box>
            <Box my={3}>
                <Autocomplete
                    value={selectedMembers}
                    multiple
                    disableCloseOnSelect
                    options={members}
                    onChange={(e, data) => {
                        const currentSelectedMembersLength = selectedMembers.length;
                        const ifSelectAllisThere = data.filter(
                            (option) => option.id === "000"
                        ).length;
                        const comingDataLength = data.length;
                        if (ifSelectAllisThere) {
                            if (comingDataLength < currentSelectedMembersLength) {
                                setSelectedMembers(data.filter((member) => member.id !== "000"));
                            } else {
                                setSelectedMembers(members);
                            }
                        } else {
                            if (comingDataLength + 1 === members.length) {
                                setSelectedMembers(members);
                            } else {
                                setSelectedMembers(data);
                            }
                        }
                    }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => {
                        return (
                            <Box {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                                {option.id !== "000" && (
                                    <Typography
                                        style={{
                                            color: "#c5c5c5",
                                        }}
                                        variant='caption'>
                                        &nbsp; {`(${option.email})`}
                                    </Typography>
                                )}
                            </Box>
                        );
                    }}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label='Select members for event'
                                variant='outlined'
                            />
                        );
                    }}
                />
            </Box>
            <Box mb={2}>
                <Button
                    onClick={addPlayers}
                    disabled={selectedMembers.length === 0}
                    variant='contained'
                    color='secondary'>
                    + Add
                </Button>
            </Box>
        </Box>
    );
};

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
