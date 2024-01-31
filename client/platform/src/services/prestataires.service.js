import axios from "axios";

export async function getPrestataire(id) {
  // return {
  //   nom: "Medley Rive Droite Paris",
  //   adresse: "21 Rue Vieille du Temple, 75004 Paris",
  //   jours_ouverture: "Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi,Dimanche",
  //   horraires_ouverture:
  //     "-,10:00-19:00,10:00-19:00,10:00-20:00,10:00-19:00,10:00-19:00,-",
  //   prestation: [
  //     {
  //       titre: "Coupe Homme",
  //       prix: 20,
  //       duree: 30,
  //       description: "Coupe Homme",
  //       category: {
  //         name: "Coiffure Homme",
  //       },
  //       feedback: {
  //         note_globale: 3.5,
  //       },
  //     },
  //     {
  //       titre: "Coupe Femme",
  //       prix: 30,
  //       duree: 30,
  //       description: "Coupe Femme",
  //       category: {
  //         name: "Coiffure Femme",
  //       },
  //       feedback: {
  //         note_globale: 5,
  //       },
  //     },
  //     {
  //       titre: "Shampooing Femme",
  //       prix: 30,
  //       duree: 30,
  //       description:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec.",
  //       category: {
  //         name: "Coiffure Femme",
  //       },
  //       feedback: {
  //         note_globale: 5,
  //       },
  //     },
  //     {
  //       titre: "Coupe Enfant",
  //       prix: 15,
  //       duree: 30,
  //       category: {
  //         name: "Coiffure Enfant",
  //       },
  //       feedback: {
  //         note_globale: 4.3,
  //       },
  //     },
  //   ],
  //   employees: [
  //     {
  //       nom: "Jean",
  //       prenom: "Pierre",
  //       description: "Je suis Pierre",
  //       image: "https://i.pravatar.cc/150",
  //     },
  //     {
  //       nom: "Dupont",
  //       prenom: "Jean",
  //       description: "Je suis Jean",
  //       image: "https://i.pravatar.cc/150",
  //     },
  //     {
  //       nom: "Martin",
  //       prenom: "Paul",
  //       description: "Je suis Paul",
  //       image: "https://i.pravatar.cc/150",
  //     },
  //   ],
  // };
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/etablissementPublic/${id}`)
    .then((response) => {
      return response;
    });
  return response;
}

export async function getEtablissementList(filter) {
  return [
    {
      id: 1,
      nom: "Medley Rive Droite Paris",
      adresse: "21 Rue Vieille du Temple, 75004 Paris",
      latitude: 48.8428732,
      longitude: 2.3996645,
      ville: "Paris",
      codePostal: "75004",
      prestation: [
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 2.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 0.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 2.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 3.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nom: "Medley Rive Droite Paris",
      adresse: "21 Rue Vieille du Temple, 75004 Paris",
      latitude: 48.8643964,
      longitude: 2.3786389,
      ville: "Paris",
      codePostal: "75004",
      prestation: [
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 2.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 0.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 2.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 3.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      nom: "Medley Rive Droite Paris",
      adresse: "21 Rue Vieille du Temple, 75004 Paris",
      latitude: 48.8471871,
      longitude: 2.3870859,
      ville: "Paris",
      codePostal: "75004",
      prestation: [
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 2.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 0.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 2.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 3.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      nom: "Medley Rive Droite Paris",
      adresse: "21 Rue Vieille du Temple, 75004 Paris",
      latitude: 48.8459719,
      longitude: 2.356,
      ville: "Paris",
      codePostal: "75004",
      prestation: [
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 2.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 0.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 2.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 3.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      nom: "Medley Rive Droite Paris",
      adresse: "21 Rue Vieille du Temple, 75004 Paris",
      latitude: 48.8616437,
      longitude: 2.2775704,
      ville: "Paris",
      codePostal: "75004",
      prestation: [
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 2.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 0.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 2.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 3.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
      ],
    },
    {
      id: 6,
      nom: "Medley Rive Droite Paris",
      adresse: "21 Rue Vieille du Temple, 75004 Paris",
      latitude: 48.8707028,
      longitude: 2.3648959,
      ville: "Paris",
      codePostal: "75004",
      prestation: [
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 2.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 0.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 2.54,
            },
            {
              note_globale: 1.65,
            },
            {
              note_globale: 4.55,
            },
          ],
        },
        {
          feedback: [
            {
              note_globale: 4.54,
            },
            {
              note_globale: 3.65,
            },
            {
              note_globale: 3.55,
            },
          ],
        },
      ],
    },
  ];
  // const response = await axios
  //   .get(`${import.meta.env.VITE_SERVER_URL}/etablissementPublic`, {
  //     params: filter,
  //   })
  //   .then((response) => {
  //     return response;
  //   });
  //   return response;
}
