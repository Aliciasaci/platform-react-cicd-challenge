import axios from "axios";

export default async function getTranslations(language) {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/translations/${language}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response;
    });
  return response.data;
}
