import React, { useState } from 'react';
import { Card, Table, Button } from 'flowbite-react';

export default function Calendar() {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const [selectedSlot, setSelectedSlot] = useState();


  //*
  // const employeId = 1;
  // const 
  const handleSlotClick = (slot, date) => {
    const selectedDateTime = date + " " + slot;
    console.log(selectedDateTime);
    // const selectedDateTime = new Date(`${date} ${slot}`);
    setSelectedSlot(selectedDateTime);
  };

  const generateTimeSlots = () => {
    const minutesPerSlot = 30;
    let slotsPerDay = 24 * 60 / minutesPerSlot;
    let slots = [];

    for (let i = 8; i <= 17; i++) {
      let slot = `${i}:00`;
      let slot2 = `${i}:30`;
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

    for (let i = 0; i < 7; i++) {
      datesSemaine.push({
        jour: daysOfWeek[i],
        date: dateActuelle.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })
      });

      // Incrémentez la date de 1 jour pour passer au jour suivant
      dateActuelle.setDate(dateActuelle.getDate() + 1);
    }

    return datesSemaine;
  };

  const dailyTimeSlots = generateDailyTimeSlots();
  const datesSemaine = setDates();

  return (
    <div>
      {selectedSlot && <span className='text-gray-900 text-xl'> {selectedSlot} </span>}
      <div className='flex justify-center items-center bg-gray-100 '>
        <Card className="flex justify-center items-center bg-white calendar-wrapper">
          <div className='flex justify-center justify-between'>
            <Button color="light">🠔</Button>
            <Button color="light">🠖</Button>
          </div>

          <Table>
            <Table.Head className='bg-white'>
              {datesSemaine.map((day, index) => (
                <Table.HeadCell className='calendar-head' key={index}>{day.jour} <br /> {day.date}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {dailyTimeSlots[daysOfWeek[0]].map((timeSlot, timeIndex) => (
                <Table.Row key={timeIndex} className="bg-white calendar-row">
                  {/* <Table.Cell className='calendar-cell'>{timeSlot}</Table.Cell> */}
                  {daysOfWeek.map((day, dayIndex) => (
                    <Table.Cell key={dayIndex} className='calendar-cell' onClick={() => handleSlotClick(dailyTimeSlots[day][timeIndex], datesSemaine[dayIndex].date)}>{dailyTimeSlots[day][timeIndex]}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
        <div>
        </div>
      </div>
    </div>
  );
}
