import { useTranslation } from "react-i18next";
import React from "react";
import { Avatar, Dropdown } from "flowbite-react";

const FLAG_IMAGES_SOURCE = {
  en: "../src/assets/img/Flag_of_the_United_States.svg",
  fr: "../src/assets/img/Flag_of_France.svg",
  es: "../src/assets/img/Flag_of_Spain.svg",
};

export const LanguageChanger = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const DropdownItem = ({ flag, alt }) => (
    <Dropdown.Item
      onClick={() => {
        changeLanguage(alt);
        setCurrentLanguage(alt);
      }}
    >
      <Avatar img={flag} alt={alt} size="xs" rounded />
    </Dropdown.Item>
  );

  const languages = ["en", "fr", "es"];

  return (
    <Dropdown
      className="flex items-center p-0 mb-2"
      label={
        <Avatar
          img={FLAG_IMAGES_SOURCE[currentLanguage]}
          alt={currentLanguage}
          size="xs"
          rounded
          bordered
          color="gray"
        />
      }
      arrowIcon={false}
      inline
    >
      {languages.map(
        (language) =>
          currentLanguage !== language && (
            <DropdownItem
              key={language}
              flag={FLAG_IMAGES_SOURCE[language]}
              alt={language}
            />
          )
      )}
    </Dropdown>
  );
};
