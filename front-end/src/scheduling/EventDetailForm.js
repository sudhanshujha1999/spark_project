import { useState } from 'react';
import {
    AddableList,
    Box,
    Button,
    Divider,
    TextField,
} from '../ui';

export const EventDetailForm = ({ selectedEvent }) => {
    const { name, description, date, time, invitees } = selectedEvent;

    return (
        <Box style={{ minWidth: 600 }}>
            <Box mb={2}>
                <h1>{name}</h1>
            </Box>
            <Box mb={2}>
                <h3>Date: {date.toLocaleDateString()}</h3>
                <h3>Time: {time}</h3>
                <h3>Description:</h3>
                <p>{description}</p>
            </Box>
            <Divider />
            <Box mb={2}>
                <h3>Invitees:</h3>
                {invitees.map(invitee => (
                    <p>{invitee}</p>
                ))}
            </Box>
        </Box>
    );
}