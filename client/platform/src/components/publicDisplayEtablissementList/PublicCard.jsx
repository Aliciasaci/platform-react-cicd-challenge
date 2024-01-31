import React from "react";
import { Card } from "flowbite-react";
import { LuMapPin } from "react-icons/lu";
import { IoIosStarOutline } from "react-icons/io";

export const PublicCard = ({ etablissement, image }) => {
  const totalCount = 0;
  const totalSum = 0;

  function calculateAverageRating(prestation) {
    prestation.forEach((item) => {
      item.feedback.forEach((feedback) => {
        totalSum += feedback.note_globale;
        totalCount++;
      });
    });

    return totalSum / totalCount;
  }

  return (
    <Card className="shadow-md">
      <Card.Body>
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src={image ?? "https://picsum.photos/300/200"}
            alt="etablissement"
          />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-black font-semibold">
              {etablissement?.nom}
            </h1>
            <span className="text-lg text-gray-500 font-light">
              <LuMapPin className="inline-block mr-1 mb-1" />
              {etablissement?.adresse}
            </span>
            <span className="text-lg text-gray-500 font-light">
              <IoIosStarOutline className="inline-block mr-1 mb-1" />
              {calculateAverageRating(etablissement?.prestation)} + " (" +{" "}
              {totalCount} + " avis)"
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
