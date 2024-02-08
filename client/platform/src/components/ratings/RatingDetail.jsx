import { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { AppContext } from '../../context';

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

  useEffect(() => {
    const fetchCriteresPerCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/${categoryId}`,
          {
            headers: {
              Accept: "application/ld+json",
            },
          }
        );
        if (response.data) {
          const criteresArray = Object.values(response.data.criteres);
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
      for (const [key, rating] of Object.entries(ratings)) {
        try {
          const res = await axios.post(`https://127.0.0.1:8000/api/feedback`, {
            client: `/api/users/${userId}`,
            prestation: `/api/prestations/${prestationId}`,
            critere: rating['id'],
            note: rating['note']
          });
  
  
          if (res.status === 201) {
            // displayResponseMessage("Note enregistré.");
            // createIndisponibilite(selectedDateTime);
          }
  
        } catch (error) {
          console.log(error);
        }
      }
      
    }
  }

  return (
    <>
      <Card href="#" className="w-full">
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
                    onClick={() => handleRatingChange(critere['@id'] ,critere.titre, currentRating)}
                  />
                  <FaStar
                    className='star'
                    size={20}
                    color={
                      currentRating <= (hover[critere.titre]  || ( ratings[critere.titre] && ratings[critere.titre]['note']) )
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => handleHoverChange(critere.titre, currentRating)}
                    onMouseLeave={() => handleHoverChange(critere.titre, null)}
                  />
                </label>
              );
            })}
             { ratings[critere.titre] &&  (<p className='text-black'> {ratings[critere.titre]['note']}</p>) } 
            <br />
          </div>
        ))}
      </Card>
      <Button onClick={createRatings}>Valider</Button>
    </>
  );
}
