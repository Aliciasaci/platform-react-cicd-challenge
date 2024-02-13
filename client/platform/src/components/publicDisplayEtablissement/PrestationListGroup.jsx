import { ListGroup } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const PrestationListGroup = ({
  prestations,
  buttonContent,
  linkTo,
  children,
}) => {
  const navigate = useNavigate();
  const handleOnClick = (prestationId, event) => {
    return () => {
      if (event) {
        event.stopPropagation();
      }
      navigate(linkTo, {
        state: {
          prestationId: prestationId,
          mode: "create",
        },
      });
    };
  };

  return (
    <ListGroup className="shadow-md">
      {Object.keys(prestations).map((index) => {
        return (
          <ListGroup.Item key={index}>
            <div
              className="w-full mx-3 my-2"
              onClick={handleOnClick(prestations[index].id)}
            >
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
                  {buttonContent && (
                    <div>
                      <button
                        onClick={(event) =>
                          handleOnClick(event, prestations[index].id)
                        }
                        type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        {buttonContent}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {prestations[index].description && (
                <div>
                  <p className="text-gray-500 my-2 font-light">
                    {prestations[index].description}
                  </p>
                </div>
              )}
              {children}
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
