import React from "react";
import { GalleryDisplay } from "../components/publicDisplayEtablissement/GalleryDisplay";
import { getPrestataire } from "../services/prestataires.service";
import { LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PrestationWrapper } from "../components/publicDisplayEtablissement/PrestationsWrapper";
import { EmployeesCard } from "../components/publicDisplayEtablissement/EmployeesCard";
import { OpeningDaysCard } from "../components/publicDisplayEtablissement/OpeningDaysCard";
import { useParams } from "react-router-dom";
import useCachedData from "../hooks/useCachedData";
import { Spinner } from "flowbite-react";
import { ErrorComponent } from "../components/ErrorComponent";
import { useTranslation } from "react-i18next";

export const PageEtablissement = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data: prestataire, isLoading, error } = useCachedData(getPrestataire, id);
    let images = [];

    if (prestataire && images.length === 0) {
        images = prestataire.imageEtablissements.map((element) => {
            let image = element.imageName;
            element.imageName = `${import.meta.env.VITE_SERVER_PUBLIC_URL}/upload/images/etablissement/${image}`;
            return element.imageName;
        });
    }

    const handleOnClick = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prestataire?.adresse)}`;
        window.open(url, "_blank");
    };

    if (isLoading) {
        return (
            <div className='h-screen mt-52'>
                <Spinner color='gray' size='xl' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='h-screen w-full errorbg'>
                <ErrorComponent status={error.status} />
            </div>
        );
    }

    return (
        prestataire && (
            <div className='my-10 w-9/12'>
                <div className='flex justify-between items-end'>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-2xl text-black font-semibold'>{prestataire?.nom}</h1>
                        <span
                            className='text-lg text-gray-500 font-light underline cursor-pointer'
                            onClick={handleOnClick}
                        >
                            <LuMapPin className='inline-block mr-1 mb-1' />
                            {prestataire?.adresse}
                        </span>
                    </div>
                    <Link to='#/'>
                        <button
                            type='button'
                            className='text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700'
                        >
                            {t("Common_Book_Appointment")}
                        </button>
                    </Link>
                </div>
                <GalleryDisplay images={images} className='w-full' />
                <div className='flex items-start mb-10'>
                    <h1 className='text-2xl font-semibold text-black'>
                        {t("Provider_Page_Book_Title", { name: prestataire?.nom })}
                    </h1>
                </div>
                <div className='grid-page'>
                    <div className='flex flex-col items-start my-3'>
                        <h1 className='text-2xl font-semibold text-black'>{t("Provider_Page_Choose_Service")}</h1>
                        <PrestationWrapper prestations={prestataire?.prestation} />
                        <h1 className='text-2xl mb-3 font-semibold text-black'>{t("Common_Employees")}</h1>
                        <EmployeesCard employees={prestataire?.employes} />
                    </div>
                    <div className='flex flex-col items-start mt-9'>
                        <h1 className='text-2xl mb-3 font-semibold text-black'>{t("Provider_Page_Opening_Hours")}</h1>
                        <OpeningDaysCard openingDays={prestataire?.horairesOuverture} />
                    </div>
                </div>
            </div>
        )
    );
};
