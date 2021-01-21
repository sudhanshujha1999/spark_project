import { useState, useEffect } from 'react';
import { get } from '../network';

export const useEvents = (year, month) => {
    const [isLoading, setIsLoading] = useState();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const response = await get(`/api/events/${year}/${month}`);
                const eventsRaw = response.data;
                const events = eventsRaw.map(event => ({
                    ...event,
                    date: new Date(event.date),
                }));
                setEvents(events);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        loadEvents();
    }, [year, month]);

    return { events, setEvents, isLoading };
}