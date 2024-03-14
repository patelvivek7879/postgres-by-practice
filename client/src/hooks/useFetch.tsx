import { FC, useEffect, useState } from 'react'

type props = {
    url : string | URL | Request
}

const useFetch = (url: any, options = {}) => {
  
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await fetch(url, options);
            console.log(response)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setData(responseData);
            setError(null);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        if(!data){
          fetchData();
        }
    
        // Cleanup function
        return () => {
          // Cleanup if needed
          useState(null);
          useState(true);
          useState(null);
        };
      }, [url, options]);

      return { data, loading, error };
}

export default useFetch
