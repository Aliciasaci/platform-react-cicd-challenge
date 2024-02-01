import axios from "axios";

export async function getEmployePrestations(prestationId) {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/prestations/${prestationId}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response;
    });
  return response;
}
