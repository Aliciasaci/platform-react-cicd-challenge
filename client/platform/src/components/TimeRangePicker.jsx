import { useState } from 'react';
import { Dropdown } from 'flowbite-react';

function TimeRangePicker() {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    // Set default values to 09:00 to 19:00
    const [startHour, setStartHour] = useState('09');
    const [startMinute, setStartMinute] = useState('00');
    const [endHour, setEndHour] = useState('19');
    const [endMinute, setEndMinute] = useState('00');

    return (
        <div className="flex text-black text-xs space-x-2">
            <Dropdown label={startHour} inline={true} className="overflow-auto max-h-60">
                {hours.map((hour) => (
                    <Dropdown.Item key={hour} onClick={() => setStartHour(hour)}>
                        {hour}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <span className='text-black pt-1 text-xs'>:</span>
            <Dropdown label={startMinute} inline={true} className="overflow-auto max-h-60">
                {minutes.map((minute) => (
                    <Dropdown.Item key={minute} onClick={() => setStartMinute(minute)}>
                        {minute}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <span className='text-black pt-1 text-xs'>-</span>
            <Dropdown label={endHour} inline={true} className="overflow-auto max-h-60">
                {hours.map((hour) => (
                    <Dropdown.Item key={hour} onClick={() => setEndHour(hour)}>
                        {hour}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <span className='text-black pt-1 text-xs'>:</span>
            <Dropdown label={endMinute} inline={true} className="overflow-auto max-h-60">
                {minutes.map((minute) => (
                    <Dropdown.Item key={minute} onClick={() => setEndMinute(minute)}>
                        {minute}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    );
}

export default TimeRangePicker;
