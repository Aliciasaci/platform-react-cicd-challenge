import React from "react";
import { Button, Card } from "flowbite-react";
import { LuMapPin } from "react-icons/lu";
import { IoIosStarOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const cardStyle = {
    height: "20rem",
    width: "100%",
    maxWidth: "100%",
    borderRadius: "0",
    position: "relative",
    border: "none",
};

export const PublicCard = ({ etablissement, isLoading }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    let totalCount = 0;
    let totalSum = 0;
    const randomNumber = Math.floor(Math.random() * 9) + 1;

    const image = `${import.meta.env.VITE_SERVER_PUBLIC_URL}/upload/images/etablissement/${
        etablissement.imageEtablissements[randomNumber].imageName
    }`;

    function calculateAverageRating(prestation) {
        prestation.forEach((item) => {
            const floatNote = parseFloat(item.note_generale);
            totalSum += floatNote;
            totalCount++;
        });

        return (totalSum / totalCount).toFixed(2);
    }

    const handleOnClick = (event, id) => {
        if (isLoading) {
            return;
        }
        if (event) {
            event.stopPropagation();
        }
        navigate(`/platform-react-cicd-challenge/etablissement/${id}`);
        // window.location.href = `/platform-react-cicd-challenge/etablissement/${id}`;
    };

    return (
        <Card
            alt='etablissement'
            style={cardStyle}
            onClick={(event) => {
                handleOnClick(event, etablissement.id);
            }}
            className='publicCard'
        >
            {isLoading ? (
                <div className=''>
                    <Spinner color='gray' size='xl' />
                </div>
            ) : (
                <>
                    <div className='flex'>
                        <div className='w-80 h-52'>
                            <img
                                src={image ?? "https://picsum.photos/300/200"}
                                alt='etablissement'
                                className='object-cover h-full w-full rounded-lg'
                            />
                        </div>
                        <div className='pl-5' style={{ fontSize: "small" }}>
                            <h1 className='text-xl text-black font-semibold'>{etablissement?.nom}</h1>
                            <span className='text-gray-500 font-light'>
                                <LuMapPin className='inline-block mr-1 mb-1' />
                                {etablissement?.adresse}
                            </span>
                            <div>
                                {etablissement?.prestation && (
                                    <span className='text-gray-500 font-light'>
                                        <IoIosStarOutline className='inline-block mr-1 mb-1' />
                                        {calculateAverageRating(etablissement?.prestation) +
                                            " " +
                                            t("Common_Feedbacks", { count: totalCount })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <Button
                            className='text-white bg-gray-800 hover:bg-gray-900 rounded-lg dark:focus:ring-gray-700 dark:border-gray-700'
                            color='primary'
                            onClick={(event) => {
                                handleOnClick(event, etablissement.id);
                            }}
                        >
                            {t("Common_See_More")}
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};
