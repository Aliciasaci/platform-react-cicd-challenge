import { Card } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";

export const OpeningDaysCard = ({ openingDays }) => {
  const { t } = useTranslation();

  const jsonOpeningDays = JSON.parse(openingDays);

  const openingDaysArray = Object.keys(jsonOpeningDays);

  const translateDay = (day) => {
    switch (day) {
      case "lundi":
        return t("Common_Monday");
      case "mardi":
        return t("Common_Tuesday");
      case "mercredi":
        return t("Common_Wednesday");
      case "jeudi":
        return t("Common_Thursday");
      case "vendredi":
        return t("Common_Friday");
      case "samedi":
        return t("Common_Saturday");
      case "dimanche":
        return t("Common_Sunday");
      default:
        return day;
    }
  };

  return (
    <Card className="shadow-md w-full">
      <ul className="flex flex-col justify-evenly divide-y divide-gray-200 dark:divide-gray-700">
        {openingDaysArray.map((day, index) => {
          const dayData = openingDays[day];
          const timeRange = dayData.checked
            ? `${dayData.timeRange.startTime} - ${dayData.timeRange.endTime}`
            : t("Common_Closed");
          return (
            <li key={index}>
              <div className="my-3 flex flex-row justify-between">
                <span className="text-gray-600 dark:text-white">
                  {translateDay(day)}
                </span>
                <span className="text-black font-medium dark:text-white">
                  {timeRange}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
