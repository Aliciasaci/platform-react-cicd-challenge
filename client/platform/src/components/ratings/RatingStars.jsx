import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Card } from 'flowbite-react';

export default function RatingStars() {
 const [ratings, setRatings] = useState({});
 const [hover, setHover] = useState({});

 const criteres = ["Note générale", "Ponctualité", "Respect", "Mission"];

 const handleRatingChange = (critere, currentRating) => {
  setRatings({ ...ratings, [critere]: currentRating });
 };

 const handleHoverChange = (critere, currentRating) => {
  setHover({ ...hover, [critere]: currentRating });
 };

 return (
  <Card href="#" className="w-full">
   <h1 className='text-xl text-black font-semibold'>Noter la prestation</h1>
   <div className='flex mb-2' style={{"display": "flex", "flex-wrap": "wrap"}}>
    <p className='text-light text-black mb-2' style={{"flex-basis" : "100%"}}>{criteres[0]}</p>
    {[...Array(5)].map((star, index) => {
     const currentRating = index + 1;
     return (
      <label key={index}>
       <input
        type="radio"
        name={criteres[0]}
        value={currentRating}
        onClick={() => handleRatingChange(criteres[0], currentRating)}
       />
       <FaStar
        className='star'
        size={20}
        color={
         currentRating <= (hover[criteres[0]] || ratings[criteres[0]])
          ? "#ffc107"
          : "#e4e5e9"
        }
        onMouseEnter={() => handleHoverChange(criteres[0], currentRating)}
        onMouseLeave={() => handleHoverChange(criteres[0], null)}
       />
      </label>
     );
    })}
    <p className='text-black'> {ratings[criteres[0]]}</p>
    <br /> 
   </div><hr />


   {criteres.slice(1).map((critere, index) => (
    <div key={index} className='flex mb-2' style={{"display": "flex", "flex-wrap": "wrap"}}>
     <p className='text-light text-black mb-2' style={{"flex-basis" : "100%"}}>{critere} </p>
     {[...Array(5)].map((star, index) => {
      const currentRating = index + 1;
      return (
       <label key={index}>
        <input
         type="radio"
         name={critere}
         value={currentRating}
         onClick={() => handleRatingChange(critere, currentRating)}
        />
        <FaStar
         className='star'
         size={20}
         color={
          currentRating <= (hover[critere] || ratings[critere])
           ? "#ffc107"
           : "#e4e5e9"
         }
         onMouseEnter={() => handleHoverChange(critere, currentRating)}
         onMouseLeave={() => handleHoverChange(critere, null)}
        />
       </label>
      );
     })}
     <p className='text-black'> {ratings[critere]}</p>
     <br />
    </div>
   ))}
  </Card>
 );
}
