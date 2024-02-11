import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/refresh`,
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => ({
      ...prev,
      accessToken: response.data.accessToken,
    }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
