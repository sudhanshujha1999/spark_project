import { useState } from "react";
import { del, post } from "../network";
import { Box, Button, Dialog, Modal, Typography } from "../ui";
import { Calendar } from "./Calendar";
import { EventDetailForm } from "./EventDetailForm";
import { NewEventForm } from "./NewEventForm";
import { useEvents } from "./useEvents";
import { useCurrentUserInfo } from "../users/useCurrentUserInfo";
import { useIsCoach } from "../users/useIsCoach";
import { useOrganizations } from "../teams";
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const SchedulingPage = () => {
    const today = new Date();
    const { userInfo: user } = useCurrentUserInfo();
    const [selectedYear, setSelectedYear] = useState(today.getYear() + 1900);
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [showEventDetailModal, setShowEventDetailModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { events, setEvents } = useEvents(selectedYear, selectedMonth);
    const { organizations } = useOrganizations();
    const { canEditEvents, teamsForEvents } = useIsCoach(organizations._id);
    const nextMonth = () => {
        const nextMonth = selectedMonth + 1;
        if (nextMonth >= 12) setSelectedYear(selectedYear + 1);
        setSelectedMonth(nextMonth % 12);
    };
    const previousMonth = () => {
        const previousMonth = selectedMonth - 1;
        if (previousMonth < 0) setSelectedYear(selectedYear - 1);
        setSelectedMonth(previousMonth < 0 ? previousMonth + 12 : previousMonth);
    };

    const addNewEvent = async (eventDetails) => {
        try {
            const { name, description, date, time, invitees, backgroundColor } = eventDetails;
            setSending(true);
            const {
                data: { eventId },
            } = await post("/api/events", eventDetails);
            setEvents([
                ...events,
                {
                    _id: eventId,
                    name,
                    description,
                    date,
                    time,
                    invitees,
                    background_color: backgroundColor,
                    created_by: user._id,
                },
            ]);
            setShowNewEventModal(false);
            setSending(false);
        } catch (e) {
            console.log(e);
            setSending(false);
        }
    };

    const deleteEvent = async (eventId) => {
        console.log("calling");
        await del(`/api/events/${eventId}`);
        setSelectedEvent(null);
        setShowEventDetailModal(false);
        setEvents(events.filter((event) => event._id !== eventId));
    };

    return (
        <>
            {/* WE CAN USE MUI DIALOG HERE INSTED OF MODAL */}
            <Modal
                open={showNewEventModal}
                onClose={() => {
                    setSelectedDate(null);
                    setShowNewEventModal(false);
                }}>
                <NewEventForm
                    selectedDate={selectedDate}
                    onSubmitEvent={addNewEvent}
                    sending={sending}
                    isCoach={canEditEvents}
                    userId={user._id}
                    allowedTeams={teamsForEvents}
                />
            </Modal>
            <Dialog
                open={showEventDetailModal}
                onClose={() => {
                    setSelectedEvent(null);
                    setShowEventDetailModal(false);
                }}>
                {selectedEvent && (
                    <Box overflow='hidden'>
                        <EventDetailForm
                            selectedEvent={selectedEvent}
                            userId={user._id}
                            isCoach={canEditEvents}
                            deleteEvent={deleteEvent}
                        />
                    </Box>
                )}
            </Dialog>
            <Box>
                <Typography variant='h3' align='center'>
                    {monthNames[selectedMonth]} {selectedYear}
                </Typography>
                <Box style={{ width: 500, margin: "auto", textAlign: "center" }}>
                    <Button onClick={previousMonth}>&lt; Previous</Button>
                    <Button onClick={nextMonth}>Next &gt;</Button>
                </Box>
                <Box>
                    <Calendar
                        year={selectedYear}
                        month={selectedMonth}
                        events={events}
                        currentDate={today.setHours(0, 0, 0, 0) / 10000}
                        isCoach={canEditEvents}
                        onClickCell={(date) => {
                            setSelectedDate(date);
                            if (canEditEvents) {
                                setShowNewEventModal(true);
                            }
                        }}
                        onClickEvent={(event) => {
                            setSelectedEvent(event);
                            setShowEventDetailModal(true);
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};
