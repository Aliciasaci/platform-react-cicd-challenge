import React from 'react';
import { Card } from 'flowbite-react';
import { Table } from 'flowbite-react';
import { useState } from 'react';

export default function Calendar() {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const [selectedSlot, setSelectedSlot] = useState();

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const generateTimeSlots = () => {
    const nbHoursPerDay = 7;
    const minutesPerSlot = 30;
    let slotsPerDay = nbHoursPerDay * 60 / minutesPerSlot;
    let slots = [];

    for (let i = 8; i < 17; i++) {
      let slot = '';
      let slot2 = '';
      for (let j = 0; j <= slotsPerDay; j++) {
        slot = i + ":00";
        slot2 = i + ":30";
      }
      slots.push(slot);
      slots.push(slot2);
    }
    return slots;
  };

  const generateDailyTimeSlots = () => {
    const dailyTimeSlots = {};
    daysOfWeek.forEach((day, index) => {
      dailyTimeSlots[day] = generateTimeSlots();
    });
    return dailyTimeSlots;
  };

  const dailyTimeSlots = generateDailyTimeSlots();

  return (
    <div className='flex justify-center items-center bg-gray-100 '>
      <Card className="flex justify-center items-center bg-white calendar-wrapper">
        <Table>
          <Table.Head className='bg-white'>
            {daysOfWeek.map((day, index) => (
              <Table.HeadCell className='calendar-head' key={index}>{day}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {dailyTimeSlots[daysOfWeek[0]].map((timeSlot, timeIndex) => (
              <Table.Row key={timeIndex} className="bg-white calendar-row">
                <Table.Cell className='calendar-cell'>{timeSlot}</Table.Cell>
                {daysOfWeek.slice(1).map((day, dayIndex) => (
                  <Table.Cell key={dayIndex} className='calendar-cell' onClick={() => handleSlotClick(dailyTimeSlots[day][timeIndex])}>{dailyTimeSlots[day][timeIndex]}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <div>
      {selectedSlot && <span>selected slot: {selectedSlot}</span>}
      </div>
    </div>
  );
}


