import { Link } from 'react-router-dom';
import { ClearIcon } from '../icons';
import {
    Card,
    Grid,
    IconButton,
} from '../ui';

export const cardStyles = {
    alignItems: 'center',
    display: 'flex',
    fontSize: '16px',
    height: '200px',
    justifyContent: 'center',
    position: 'relative',
};

export const TeamsListItem = ({ team, onClickDelete }) => {
    return (
        <Grid item xs={3} key={team.id}>
            <Link to={`/teams/${team.id}`}>
                <Card raised style={cardStyles}>
                    <h3 key={team.id}>{team.name}</h3>
                    <IconButton
                        onClick={e => {
                            onClickDelete(team.id);
                            e.preventDefault();
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            color: '#888',
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Card>
            </Link>
        </Grid>
    );
}