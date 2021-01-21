import { useState } from 'react';
import { post } from '../network';
import {
    Box,
    Button,
    Modal,
    Typography,
} from '../ui';
import { Calendar } from './Calendar';
import { NewEventForm } from './NewEventForm';
import { useEvents } from './useEvents';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const SchedulingPage = () => {
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getYear() + 1900);
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const { events, setEvents, isLoading: isLoadingEvents } = useEvents(selectedYear, selectedMonth);

    const nextMonth = () => {
        const nextMonth = selectedMonth + 1;
        if (nextMonth >= 12) setSelectedYear(selectedYear + 1);
        setSelectedMonth(nextMonth % 12);
    }

    const previousMonth = () => {
        const previousMonth = selectedMonth - 1;
        if (previousMonth < 0) setSelectedYear(selectedYear - 1);
        setSelectedMonth(previousMonth < 0 ? previousMonth + 12 : previousMonth);
    }

    const addNewEvent = async eventDetails => {
        try {
            await post('/api/events', eventDetails);
            const { name, description, date } = eventDetails;
            setEvents([...events, { name, description, date }]);

            setShowNewEventModal(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <Modal
            open={showNewEventModal}
            onClose={() => {
                setSelectedDate(null);
                setShowNewEventModal(false)
            }}
        >
            <NewEventForm selectedDate={selectedDate} onSubmitEvent={addNewEvent} />
        </Modal>
        <Box>
            <Typography variant="h3" align="center">
                {monthNames[selectedMonth]} {selectedYear}
            </Typography>
            <Box style={{ width: 500, margin: 'auto', textAlign: 'center' }}>
                <Button onClick={previousMonth}>&lt; Previous</Button>
                <Button onClick={nextMonth}>Next &gt;</Button>
            </Box>
            <Box>
                <Calendar
                    year={selectedYear}
                    month={selectedMonth}
                    events={events}
                    currentDate={today}
                    onClickCell={date => {
                        setSelectedDate(date);
                        setShowNewEventModal(true);
                    }}
                />
            </Box>
        </Box>
        </>
    );
}