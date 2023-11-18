export const PrestationWrapper = ({ prestations }) => {
  const groupedPrestations = prestations.reduce((acc, prestation) => {
    const category = prestation.categorie;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prestation);
    return acc;
  }, {});

  console.log(groupedPrestations);

  return (
    <div>
      {Object.keys(groupedPrestations).map((category, index) => {
        return (
          <div key={index}>
            <h1>{category}</h1>
            {groupedPrestations[category].map((prestation, index) => {
              return (
                <div key={index}>
                  <h2>{prestation.nom}</h2>
                  {prestation.description && <p>{prestation.description}</p>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
