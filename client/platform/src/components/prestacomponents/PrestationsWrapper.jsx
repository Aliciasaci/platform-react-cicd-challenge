import { PrestationListGroup } from "./PrestationListGroup";

export const PrestationWrapper = ({ prestations }) => {
  /*const prestations = [
    {
      titre: "Coupe Homme",
      prix: 20,
      duree: 30,
      description: "Coupe Homme",
      categorie: "Coiffure Homme",
      feedback: {
        note_globale: 3.5,
      },
    },
    {
      titre: "Coupe Femme",
      prix: 30,
      duree: 30,
      description: "Coupe Femme",
      categorie: "Coiffure Femme",
      feedback: {
        note_globale: 5,
      },
    },
    {
      titre: "Shampooing Femme",
      prix: 30,
      duree: 30,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec. Nulla euismod, nisl eget ultricies aliquam, nisl nisl ultricies nisl, nec aliquet nisl nisl nec.",
      categorie: "Coiffure Femme",
      feedback: {
        note_globale: 5,
      },
    },
    {
      titre: "Coupe Enfant",
      prix: 15,
      duree: 30,
      categorie: "Coiffure Enfant",
      feedback: {
        note_globale: 4.3,
      },
    },
  ];*/

  const groupedPrestations = prestations.reduce((acc, prestation) => {
    const category = prestation.categorie;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prestation);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedPrestations).map((category, index) => {
        return (
          <div className="my-8" key={index}>
            <h2 className="text-xl mb-3 font-semibold text-black">
              {category}
            </h2>
            <PrestationListGroup
              prestations={groupedPrestations[category]}
              buttonContent={"Choisir"}
            />
          </div>
        );
      })}
    </div>
  );
};
