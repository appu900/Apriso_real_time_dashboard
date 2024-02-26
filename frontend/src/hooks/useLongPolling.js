import React, { useState } from "react";

const useLongPolling = (url, delay) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, delay);
    return () => clearInterval(interval);
  }, []);


  if (data) return data;
  return null;
};

export default useLongPolling;
