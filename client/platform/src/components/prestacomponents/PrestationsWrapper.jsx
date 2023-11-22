import { PrestationListGroup } from "./PrestationListGroup";

export const PrestationWrapper = ({ prestations }) => {
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
              linkTo={"/reservation/"}
            />
          </div>
        );
      })}
    </div>
  );
};
