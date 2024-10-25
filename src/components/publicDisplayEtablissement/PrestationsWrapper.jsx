import { PrestationListGroup } from "./PrestationListGroup";
import { useTranslation } from "react-i18next";
import React from "react";

export const PrestationWrapper = ({ prestations }) => {
    const { t } = useTranslation();
    const groupedPrestations = prestations.reduce((acc, prestation) => {
        const category = prestation.category.name;
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
                    <div className='my-8' key={index}>
                        <h2 className='text-xl mb-3 font-semibold text-black'>{category}</h2>
                        <PrestationListGroup
                            prestations={groupedPrestations[category]}
                            buttonContent={t("Common_Choose")}
                            linkTo={"/platform-react-cicd-challenge/reservation/"}
                        />
                    </div>
                );
            })}
        </div>
    );
};
