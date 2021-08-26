import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from './';

export const DatePicker = ({ value, setValue }) => {
    const startYear = new Date().getFullYear();
    const monthOption = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const currentDate = new Date();
    const [date, setDate] = useState(currentDate.getDate());
    const [month, setMonth] = useState(monthOption[currentDate.getMonth()]);
    const [year, setYear] = useState(startYear);

    useEffect(() => {
        if (value) {
            const yymmdd = value.split('-');
            setYear(yymmdd[0]);
            setMonth(monthOption[parseInt(yymmdd[1]) - 1]);
            setDate(yymmdd[2]);
        } else {
            const newDate = `${year}-${monthOption.indexOf(month) + 1 < 10 ? '0' : ''}${
                monthOption.indexOf(month) + 1
            }-${date < 10 ? '0' : ''}${date}`;
            setValue(newDate);
        }
        // eslint-disable-next-line
    }, []);

    function isLeapYear(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                if (year % 400 === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    useEffect(() => {
        // IF MONTH IS BEFORE THE CURRENT DATE
        const currentDate = new Date();
        if (year === currentDate.getFullYear()) {
            if (monthOption.indexOf(month) <= parseInt(currentDate.getMonth())) {
                setMonth(monthOption[currentDate.getMonth()]);
                if (date < currentDate.getDate()) {
                    setDate(currentDate.getDate());
                }
            }
        }

        // IF MONTH IS FEB
        if (monthOption.indexOf(month) === 1) {
            if (date > 29) {
                if (isLeapYear(year)) {
                    setDate(29);
                } else {
                    setDate(28);
                }
            } else {
                if (date === 29 && !isLeapYear(year)) {
                    setDate(28);
                }
            }
        } else {
            // IF THE MONTH IS OF 30 DAYS
            const thiryDaysMonths = ['April', 'June', 'September', 'November'];
            if (thiryDaysMonths.includes(month) && date > 30) {
                setDate(30);
            }
        }
        const newDate = `${year}-${monthOption.indexOf(month) + 1 < 10 ? '0' : ''}${
            monthOption.indexOf(month) + 1
        }-${date < 10 ? '0' : ''}${date}`;
        setValue(newDate);
        // eslint-disable-next-line
    }, [date, month, year, setValue]);

    return (
        <Box>
            {/* MONTH */}

            <Box mr={2} component='span'>
                <FormControl variant='outlined' color='secondary'>
                    <InputLabel id='month-label'>Month</InputLabel>
                    <Select
                        labelId='month-label'
                        value={month}
                        MenuProps={{ disableScrollLock: true }}
                        onChange={e => setMonth(e.target.value)}
                        label='Month'>
                        {monthOption.map(item => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* DATE */}

            <Box mr={2} component='span'>
                <FormControl variant='outlined' color='secondary'>
                    <InputLabel id='year-label'>Date</InputLabel>
                    <Select
                        labelId='year-label'
                        value={date}
                        MenuProps={{ disableScrollLock: true }}
                        onChange={e => setDate(e.target.value)}
                        label='Month'>
                        {new Array(31).fill(1).map((item, index) => (
                            <MenuItem key={index} value={1 + index}>
                                {1 + index}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* YEAR */}

            <Box mr={2} component='span'>
                <FormControl variant='outlined' color='secondary'>
                    <InputLabel id='year-label'>Year</InputLabel>
                    <Select
                        labelId='year-label'
                        value={year}
                        MenuProps={{ disableScrollLock: true }}
                        onChange={e => setYear(e.target.value)}
                        label='Month'>
                        {new Array(10).fill(1).map((item, index) => (
                            <MenuItem key={index} value={startYear + index}>
                                {startYear + index}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};
