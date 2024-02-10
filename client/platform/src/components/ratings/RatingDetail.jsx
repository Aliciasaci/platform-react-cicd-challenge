<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
=======
import { useState, useEffect, useContext } from 'react';
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
import { FaStar } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { AppContext } from '../../context';
<<<<<<< HEAD
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
=======

import axios from 'axios';

export default function RatingDetail({prestationId}) {
  const [ratings, setRatings] = useState({});
  const [hover, setHover] = useState({});
  const [criteres, setCriteres] = useState([]);
  const { userId } = useContext(AppContext);


  const handleRatingChange = (id, critere, currentRating) => {
    setRatings({ ...ratings, [critere]:  { id: id, note: currentRating } });
  };

  const handleHoverChange = (critere, currentRating) => {
    setHover({ ...hover, [critere]: currentRating });
  };

  const categoryId = 1;
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e

  useEffect(() => {
    const fetchCriteresPerCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/${categoryId}`,
          {
            headers: {
<<<<<<< HEAD
              Accept: 'application/ld+json',
=======
              Accept: "application/ld+json",
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
            },
          }
        );
        if (response.data) {
          const criteresArray = Object.values(response.data.criteres);
<<<<<<< HEAD
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
=======
          console.log(response.data.criteres)
          setCriteres(criteresArray);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchCriteresPerCategory();
  }, [categoryId]);

  const createRatings = async () => {
    // console.log(ratings)
    // console.log(ratings["Note générale"]['id'])
    if (Object.keys(ratings).length > 0){
      for (const [key, rating] of Object.entries(object)) {
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
        try {
          const res = await axios.post(`https://127.0.0.1:8000/api/feedback`, {
            client: `/api/users/${userId}`,
            prestation: `/api/prestations/${prestationId}`,
            critere: rating['id'],
<<<<<<< HEAD
            note: rating['note'],
          });
=======
            note: rating['note']
          });
  
  
          if (res.status === 201) {
            // displayResponseMessage("Note enregistré.");
            // createIndisponibilite(selectedDateTime);
          }
  
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
        } catch (error) {
          console.log(error);
        }
      }
<<<<<<< HEAD
    }
  };

  return (
    <>
      <Card className="w-full">
=======
      
    }
  }

  return (
    <>
      <Card href="#" className="w-full">
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
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
<<<<<<< HEAD
                    onClick={() => handleRatingChange(critere['@id'], critere.titre, currentRating)}
=======
                    onClick={() => handleRatingChange(critere['@id'] ,critere.titre, currentRating)}
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
                  />
                  <FaStar
                    className='star'
                    size={20}
                    color={
<<<<<<< HEAD
                      currentRating <= (hover[critere.titre] || (ratings[critere.titre] && ratings[critere.titre]['note']))
=======
                      currentRating <= (hover[critere.titre]  || ( ratings[critere.titre] && ratings[critere.titre]['note']) )
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => handleHoverChange(critere.titre, currentRating)}
                    onMouseLeave={() => handleHoverChange(critere.titre, null)}
                  />
                </label>
              );
            })}
<<<<<<< HEAD
            {ratings[critere.titre] && (<p className='text-black'> {ratings[critere.titre]['note']}</p>)}
=======
             { ratings[critere.titre] &&  (<p className='text-black'> {ratings[critere.titre]['note']}</p>) } 
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
            <br />
          </div>
        ))}
      </Card>
<<<<<<< HEAD
      <button onClick={createRatings} type="button" class=" mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>
=======
      <Button onClick={createRatings}>Valider</Button>
>>>>>>> d1a9f2f253dd21dd8cef00d52a1d35d690eb518e
    </>
  );
}
