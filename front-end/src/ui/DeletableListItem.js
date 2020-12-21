import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { CircleXIcon } from '../icons';

export const DeletableListItem = ({ children, index, onRequestDelete }) => (
    <Grid container>
        <Grid item xs={10}>
            {children}
        </Grid>
        <Grid item xs={2}>
            <Box display="flex" height="100%" alignItems="center" justifyContent="center">
                <IconButton onClick={() => onRequestDelete(index)}>
                    <CircleXIcon />
                </IconButton>
            </Box>
        </Grid>
    </Grid>
);