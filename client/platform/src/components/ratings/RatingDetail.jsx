import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { AppContext } from '../../context';
import axios from 'axios';

export default function RatingDetail({ prestationId , notes}) {
  const [ratings, setRatings] = useState({});
  const [hover, setHover] = useState({});
  const [criteres, setCriteres] = useState([]);
  const { userId } = useContext(AppContext); 
  const userNotes = notes.filter((note) => note.client.id == userId)


  const handleRatingChange = (id, critere, currentRating) => {
    setRatings({ ...ratings, [critere]: { id: id, note: currentRating } });
  };

  const handleHoverChange = (critere, currentRating) => {
    console.log(ratings);
    setHover({ ...hover, [critere]: currentRating });
  };

  const categoryId = 1;  //rendre dynamique

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
      if (userNotes.length > 0){
        userNotes.forEach((note) => {
          setRatings(prevRatings => ({ ...prevRatings, [note.critere.titre] : {id: note.id, note:note.note}}))
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
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/feedback`, {
            client: `/api/users/${userId}`,
            prestation: `/api/prestations/${prestationId}`,
            critere: rating['id'],
            note: rating['note'],
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
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
            {ratings[critere.titre] && (<p className='text-black'> {ratings[critere.titre]['note']}</p>)}
            <br />
          </div>
        ))}
      </Card>
      <button onClick={createRatings} type="button" class=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
    </>
  );
}
