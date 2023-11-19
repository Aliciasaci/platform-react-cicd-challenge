import { ListGroup } from "flowbite-react";

export const PrestationListGroup = ({ prestations, buttonContent }) => {
  return (
    <ListGroup className="shadow-md">
      {Object.keys(prestations).map((index) => {
        return (
          <ListGroup.Item href="#" key={index}>
            <div className="w-full mx-3 my-2">
              <div className="flex flex-row justify-between items-center">
                <p className="text-light text-black">
                  {prestations[index].titre}
                </p>
                <div className="flex items-center">
                  <div className="mr-8">
                    <span className="text-gray-500 font-light">
                      {prestations[index].duree}mins
                    </span>
                    <span className="text-gray-300"> • </span>
                    <span className="text-gray-500">
                      {prestations[index].prix} €
                    </span>
                  </div>
                  <div>
                    <button
                      href="#"
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      {buttonContent}
                    </button>
                  </div>
                </div>
              </div>
              {prestations[index].description && (
                <div>
                  <p className="text-gray-500 my-2 font-light">
                    {prestations[index].description}
                  </p>
                </div>
              )}
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
