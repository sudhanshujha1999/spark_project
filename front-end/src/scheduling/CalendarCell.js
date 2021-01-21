import {
    Box,
} from '../ui';

export const CalendarCell = ({ date, events = [], onClick }) => {
    return date ? (
        <Box
            p={1}
            style={{
                backgroundColor: '#555',
                height: '100%',
                cursor: 'pointer',
            }}
            onClick={() => onClick(date)}
        >
            {date.getDate()}
            {events.map(event => (
                <Box
                    p={1}
                    mb={1}
                    style={{
                        backgroundColor: '#7289da',
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}>
                       {event.name} 
                </Box>
            ))}
        </Box>
    ) : (
        <Box
            p={1}
            style={{
                backgroundColor: '#363636',
                height: '100%',
            }}
        />
    );
}