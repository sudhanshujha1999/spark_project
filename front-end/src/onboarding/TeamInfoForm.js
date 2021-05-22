// REMOVE
import { useState } from "react";
import { Button, TextField } from "../ui";

export const TeamInfoForm = ({ onSubmit }) => {
    return (
        <>
            <TextField fullWidth variant='outlined' />
            <Button variant='contained' fullWidth>
                Create
            </Button>
        </>
    );
};
