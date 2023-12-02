import React from "react";

const useCachedData = (fetchData, id) => {
  const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState();
  const cache = React.useRef({});

  React.useEffect(() => {
    const fetchAndCacheData = async () => {
        setError(null);
        if (cache.current[id]) {
            setData(cache.current[id]);
            setIsLoading(false);
        } else {
            try {
                const newData = await fetchData(id);
                cache.current[id] = newData.data;
                setData(newData.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        }
    };
    fetchAndCacheData();
  }, [fetchData, id]);

  return { data, isLoading, error };
};

export default useCachedData;