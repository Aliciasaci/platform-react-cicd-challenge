import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { AppContext } from '../../context';
import axios from 'axios';

export default function RatingDetail({ prestationId, notes, categorieId }) {
  const [ratings, setRatings] = useState({});
  const [hover, setHover] = useState({});
  const [criteres, setCriteres] = useState([]);
  const { userId } = useContext(AppContext);
  const [responseMessage, setResponseMessage] = useState("");
  const [userNotes, setUserNotes] = useState([])

  const handleRatingChange = (id, critere, currentRating) => {
    setRatings({ ...ratings, [critere]: { id: id, note: currentRating } });
  };

  const handleHoverChange = (critere, currentRating) => {
    setHover({ ...hover, [critere]: currentRating });
  };

  const displayResponseMessage = (message) => {
    setResponseMessage(message);
    setTimeout(() => {
      setResponseMessage("");
    }, 5000);
  };

  const categoryId = categorieId;

  useEffect(() => {
    const fetchCriteresPerCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/${categoryId}`,
          {
            headers: {
              Accept: 'application/ld+json',
            },
          }
        );
        if (response.data) {
          const criteresArray = Object.values(response.data.criteres);
          setCriteres(criteresArray);
        }
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    const initializeRatings = () => {
      setUserNotes(notes.filter((note) => note.client.id == userId));
      if (userNotes.length > 0) {
        userNotes.forEach((note) => {
          setRatings(prevRatings => ({ ...prevRatings, [note.critere.titre]: { id: note.id, note: note.note } }))
        })
      }
    };

    fetchCriteresPerCategory();
    initializeRatings();
  }, [categoryId]);


  const createRatings = async () => {
    if (Object.keys(ratings).length > 0) {
      for (const [key, rating] of Object.entries(ratings)) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/feedback`, {
            client: `/api/users/${userId}`,
            prestation: `/api/prestations/${prestationId}`,
            critere: rating['id'],
            note: rating['note'],
          });

          if (res.status === 201) {
            displayResponseMessage("Votre note a bien été enregistrée");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      {responseMessage && (
        <div
          className={`fade-out p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400`}
          role="alert">
          <span className="font-medium"> {responseMessage} </span>
        </div>
      )}
      <Card className="w-full">
        <h1 className='text-xl text-black font-semibold'>Noter la prestation</h1>
        {criteres.map((critere, index) => (
          <div key={index} className='flex' style={{ display: "flex", flexWrap: "wrap" }}>
            <p className='text-light text-black mb-1' style={{ flexBasis: "100%" }}>{critere.titre}</p>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name={critere.titre}
                    value={currentRating}
                    onClick={() => handleRatingChange(critere['@id'], critere.titre, currentRating)}
                  />
                  <FaStar
                    className='star'
                    size={20}
                    color={
                      currentRating <= (hover[critere.titre] || (ratings[critere.titre] && ratings[critere.titre]['note']))
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => handleHoverChange(critere.titre, currentRating)}
                    onMouseLeave={() => handleHoverChange(critere.titre, null)}
                  />
                </label>
              );
            })}
            {ratings[critere.titre] && (<p className='text-gray-500 ml-2 font-semibold'> {ratings[critere.titre]['note']}</p>)}
            <br />
          </div>
        ))}
      </Card>
      <button onClick={createRatings} type="button" class=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
    </>
  );
}
