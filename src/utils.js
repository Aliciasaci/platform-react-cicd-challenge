const getApiKey = () => {
    const key = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    return key;
};

const getServerUrl = () => {
    const url = import.meta.env.VITE_SERVER_URL;
    return url;
}