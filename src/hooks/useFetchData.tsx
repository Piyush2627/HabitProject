import { useEffect, useState } from "react";

interface useProps {
  url: string;
}
function useFetchData({ url }: useProps) {
  const [Data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responce = await fetch(url);
        const json = await responce.json();
        setData(json);
      } catch (error) {
        setError("errors");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { Data, isLoading, error };
}

export default useFetchData;
