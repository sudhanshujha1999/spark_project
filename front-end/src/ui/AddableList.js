import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { DeletableListItem } from './DeletableListItem';

export const AddableList = ({ items, onCreate, onRemove, mainButtonText = '+ Add', newInputText = 'New Item' }) => {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onCreateInternal = () => {
        onCreate(inputValue);
        setInputValue('');
    }

    return (
        <Box>
            {items.map((item, i) => (
                <DeletableListItem onRequestDelete={index => onRemove(index)} index={i}>
                    <p>{item}</p>
                    <Divider />
                </DeletableListItem>
            ))}
            <Box mb={2} style={{ display: 'flex '}}>
                {isAddingItem
                    ? (
                        <>
                        <TextField
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            style={{ flex: 8, marginRight: 8 }}
                            label={newInputText}
                            variant="outlined" />
                        <Button
                            style={{ flex: 1, marginRight: 8 }}
                            onClick={() => {
                                setIsAddingItem(false);
                                setInputValue('');
                            }}
                            color="primary"
                            variant="contained"
                        >Cancel</Button>
                        <Button
                            color="primary"
                            style={{ flex: 1 }}
                            onClick={onCreateInternal}
                            variant="contained"
                        >Add</Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsAddingItem(true)}
                            color="primary"
                            variant="contained"
                        >{mainButtonText}</Button>
                    )}
            </Box>
        </Box>
    );
}