import { Box, Grid } from "../ui";
import { datesAreEqual, getWeeksForMonth, leftPadArray, rightPadArray } from "../util";
import { CalendarCell } from "./CalendarCell";

export const Calendar = ({
    year,
    month,
    events,
    onClickCell,
    currentDate,
    onClickEvent = () => {},
}) => {
    const weeks = getWeeksForMonth(year, month);
    const filledWeeks = weeks.map((weekDays, i) => {
        if (i === 0) {
            return leftPadArray(weekDays, 7);
        }

        if (i === weeks.length - 1) {
            return rightPadArray(weekDays, 7);
        }

        return weekDays;
    });
    const numberOfWeeks = filledWeeks.length;
    return (
        <>
            {filledWeeks.map((days) => (
                <Box
                    style={{
                        display: "flex",
                        minHeight: 80 / numberOfWeeks + "vh",
                    }}>
                    {days.map((date) => {
                        const dateEvents =
                            date &&
                            events.filter((event) => {
                                return datesAreEqual(date, event.date);
                            });
                        return (
                            <Box style={{ flex: 1, maxWidth:'14.29%' }} p={1}>
                                <CalendarCell
                                    date={date}
                                    events={dateEvents}
                                    onClick={onClickCell}
                                    activeDate={date && date.getTime() / 10000 === currentDate}
                                    onClickEvent={onClickEvent}
                                />
                            </Box>
                        );
                    })}
                </Box>
            ))}
        </>
    );
};
