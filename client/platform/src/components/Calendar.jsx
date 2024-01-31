import { Card, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Calendar({ employeId }) {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const [selectedSlot, setSelectedSlot] = useState();
  const [indisponibilites, setIndisponibilites] = useState();


  useEffect(() => {
    const getIndisponibiliteEmploye = async () => {
      try {
        const response = await axios.get(`https://127.0.0.1:8000/api/employes/${employeId}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.data) {
          setIndisponibilites(response.data.indisponibilites);

        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    }

    getIndisponibiliteEmploye();
  }, [employeId]);


  const handleSlotClick = (slot, date) => {
    const selectedDateTime = date + " " + slot;
    console.log(selectedDateTime);
    // const selectedDateTime = new Date(`${date} ${slot}`);
    setSelectedSlot(selectedDateTime);
  };

  const generateTimeSlots = (dateSemaine) => {

    if (indisponibilites && indisponibilites.filter((indispo) => indispo.jour == dateSemaine.date).length > 0) {
      let data = indisponibilites.filter((indispo) => indispo.jour == dateSemaine.date).map((indispo) => indispo.creneau);
      const minutesPerSlot = 30;
      let slotsPerDay = 24 * 60 / minutesPerSlot;
      let slots = [];

      for (let i = 8; i <= 17; i++) {
        let slot = `${i}:00`;
        let slot2 = `${i}:30`;
        if (data.some((indispo) => { return indispo === slot })) {
          slots.push("Indisponible")
        }
        else {
          slots.push(slot);
        }
        if (data.some((indispo) => { return indispo === slot2 })) {
          slots.push("Indisponible")
        }
        else {
          slots.push(slot2);
        }

      }
      return slots;
    }
    else {
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
    }

  };

  const generateDailyTimeSlots = () => {
    const dailyTimeSlots = {};
    let index = 0;
    daysOfWeek.forEach((day) => {
      dailyTimeSlots[day] = generateTimeSlots(datesSemaine[index]);
      index++;
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

  const datesSemaine = setDates();
  const dailyTimeSlots = generateDailyTimeSlots();


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
                    <Table.Cell
                      key={dayIndex}
                      className={`calendar-cell ${dailyTimeSlots[day][timeIndex] === 'Indisponible' ? 'bg-white' : ''}`}
                      onClick={() => {
                        if (dailyTimeSlots[day][timeIndex] !== 'Indisponible') {
                          handleSlotClick(dailyTimeSlots[day][timeIndex], datesSemaine[dayIndex].date);
                        }
                      }}
                    >
                      {dailyTimeSlots[day][timeIndex] !== 'Indisponible' && dailyTimeSlots[day][timeIndex]}
                    </Table.Cell>
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
