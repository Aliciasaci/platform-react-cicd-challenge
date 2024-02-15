import axios from "axios";

export async function getPrestataire(id) {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/public/etablissementPublic/${id}`)
    .then((response) => {
      return response;
    });
  return response;
}

export async function getEtablissements() {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/filter?page=1`)
    .then((response) => {
      return response;
    });
  return response;
}
