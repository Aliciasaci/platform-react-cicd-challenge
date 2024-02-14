import React from 'react';

export default function RatingGeneral({ notes }) {

 const calculateAverages = ({ notes }) => {
  const moyennesParCritere = {};
  const notesParCritere = {};
  let totalNotes = 0;
  let totalCritere = 0;

  if (notes && notes.length > 0) {
   notes.forEach((item) => {
    const critereTitre = item.critere.titre;
    const note = item.note;

    if (!notesParCritere[critereTitre]) {
     notesParCritere[critereTitre] = [];
    }

    notesParCritere[critereTitre].push(note);
    totalNotes += note;
    totalCritere++;
   });

   const moyenneGenerale = totalNotes / totalCritere;

   for (const critere in notesParCritere) {
    const total = notesParCritere[critere].reduce((acc, cur) => acc + cur, 0);
    moyennesParCritere[critere] = total / notesParCritere[critere].length;
   }

   return { moyenneGenerale, moyennesParCritere };
  }

  return { moyenneGenerale: 0, moyennesParCritere: {} };
 };

 const { moyenneGenerale, moyennesParCritere } = calculateAverages({ notes });

 if (!moyennesParCritere) {
  return null;
 }

 return (
  <>
   <div className='mb-5'>
    <div className="flex items-center mb-5">
     <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">{moyenneGenerale.toFixed(1)}</p>
     <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{notes.length} Revues</p>
    </div>
    <div className="gap-8 sm:grid sm:grid-cols-2">
     <div>
      {Object.keys(moyennesParCritere).map((critere, index) => (
       <dl key={index}>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{critere}</dt>
        <dd className="flex items-center mb-3">
         <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
          <div className="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: `${moyennesParCritere[critere] * 20}%` }}></div>
         </div>
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{moyennesParCritere[critere].toFixed(1)}</span>
        </dd>
       </dl>
      ))}
     </div>
    </div>
   </div>
  </>
 );
}