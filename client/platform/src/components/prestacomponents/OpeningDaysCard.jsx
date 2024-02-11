import { Card } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";

export const OpeningDaysCard = ({ openingDays, openingHours }) => {
  const { t } = useTranslation();
  const openingDaysMap = React.useCallback(() => {
    return openingDays.split(",");
  }, []);

  const openingDaysArray = openingDaysMap();

  const openingHoursMap = React.useCallback(() => {
    return openingHours.split(",");
  }, []);

  const openingHoursArray = openingHoursMap();

  return (
    <Card className="shadow-md w-full">
      <ul className="flex flex-col justify-evenly divide-y divide-gray-200 dark:divide-gray-700">
        {openingDaysArray.map((day, index) => {
          return (
            <li key={index}>
              <div className="my-3 flex flex-row justify-between">
                <span className="text-gray-600 dark:text-white">{day}</span>
                <span className="text-black font-medium dark:text-white">
                  {openingHoursArray[index] !== "-"
                    ? openingHoursArray[index]
                    : t("Common_Closed")}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
