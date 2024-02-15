import { useState, useEffect } from 'react';
import { Dropdown } from 'flowbite-react';
import { useTranslation } from "react-i18next";

function TimeRangePicker({ day, onTimeRangeChange, show }) {
    const { t } = useTranslation();
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    // Set default values to 09:00 to 19:00
    const [startHour, setStartHour] = useState('09');
    const [startMinute, setStartMinute] = useState('00');
    const [endHour, setEndHour] = useState('19');
    const [endMinute, setEndMinute] = useState('00');

    const handleStartHourClick = (hour) => {
        setStartHour(hour);
        updateTimetable(hour, startMinute, endHour, endMinute);
    };

    const handleStartMinuteClick = (minute) => {
        setStartMinute(minute);
        updateTimetable(startHour, minute, endHour, endMinute);
    };

    const handleEndHourClick = (hour) => {
        setEndHour(hour);
        updateTimetable(startHour, startMinute, hour, endMinute);
    };

    const handleEndMinuteClick = (minute) => {
        setEndMinute(minute);
        updateTimetable(startHour, startMinute, endHour, minute);
    };

    const updateTimetable = (startTimeHour, startTimeMinute, endTimeHour, endTimeMinute) => {
        const timeRange = {
            startTime: `${startTimeHour}:${startTimeMinute}`,
            endTime: `${endTimeHour}:${endTimeMinute}`,
        };
        if (day && show) {
            onTimeRangeChange(timeRange, day);
        }
    };

    return (
        <div>
            { show ? 
            <div className="flex text-black text-xs space-x-2">
            <Dropdown label={startHour} inline={true} className="overflow-auto max-h-60">
                {hours.map((hour) => (
                    <Dropdown.Item key={hour} onClick={() => handleStartHourClick(hour)}>
                        {hour}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <span className='text-black pt-1 text-xs'>:</span>
            <Dropdown label={startMinute} inline={true} className="overflow-auto max-h-60">
                {minutes.map((minute) => (
                    <Dropdown.Item key={minute} onClick={() => handleStartMinuteClick(minute)}>
                        {minute}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <span className='text-black pt-1 text-xs'>-</span>
            <Dropdown label={endHour} inline={true} className="overflow-auto max-h-60">
                {hours.map((hour) => (
                    <Dropdown.Item key={hour} onClick={() => handleEndHourClick(hour)}>
                        {hour}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <span className='text-black pt-1 text-xs'>:</span>
            <Dropdown label={endMinute} inline={true} className="overflow-auto max-h-60">
                {minutes.map((minute) => (
                    <Dropdown.Item key={minute} onClick={() => handleEndMinuteClick(minute)}>
                        {minute}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            </div>
            : 
                <span className='text-sm text-black' >
                    {t("Common_Closed")}
                </span>
            }
        </div>
    );
}

export default TimeRangePicker;
