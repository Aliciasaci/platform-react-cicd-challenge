import React, { useState } from 'react';
import { Card, Table, Button } from 'flowbite-react';

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
      let slot = i + ":00";
      let slot2 = i + ":30";
      slots.push(slot);
      slots.push(slot2);
    }
    return slots;
  };

  const generateDailyTimeSlots = () => {
    const dailyTimeSlots = {};
    daysOfWeek.forEach((day) => {
      dailyTimeSlots[day] = generateTimeSlots();
    });
    return dailyTimeSlots;
  };

  const setDates = () => {
    let datesSemaine = [];
    let dateActuelle = new Date();

    for(let i = 0; i < 7; i++){
      datesSemaine.push({
        jour: daysOfWeek[i],
        date: dateActuelle.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      });

      // Incrémentez la date de 1 jour pour passer au jour suivant
      dateActuelle.setDate(dateActuelle.getDate() + 1);
    }

    return datesSemaine;
  };

  const dailyTimeSlots = generateDailyTimeSlots();
  const datesSemaine = setDates();

  return (
    <div className='flex justify-center items-center bg-gray-100 '>
      <Card className="flex justify-center items-center bg-white calendar-wrapper">
        <div className='flex justify-center justify-between'>
          <Button color="light">🠔</Button>
          <Button color="light">🠖</Button>
        </div>

        <Table>
          <Table.Head className='bg-white'>
            {datesSemaine.map((day, index) => (
              <Table.HeadCell className='calendar-head' key={index}>{day.jour} - {day.date}</Table.HeadCell>
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
      {/* <div>
        {selectedSlot && <span>selected slot: {selectedSlot}</span>}
      </div> */}
    </div>
  );
}
