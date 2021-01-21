export const getWeeksForMonth = (year, month) => {
    let date = new Date(year, month, 1);
    let currentWeekDays = [];
    let weeks = [];

    while (date.getMonth() === month) {
        currentWeekDays.push(new Date(date));
        date.setDate(date.getDate() + 1);
        if (date.getDay() === 0) {
            weeks.push(currentWeekDays);
            currentWeekDays = [];
        }
    }

    if (currentWeekDays.length > 0) {
        weeks.push(currentWeekDays);
    }

    return weeks;
}