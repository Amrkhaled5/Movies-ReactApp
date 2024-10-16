import { useEffect, useState } from "react";
const KEY = "2430f1ab";
function useMovie(query, setSelectedID) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      setSelectedID?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Somthing went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movies not Found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      //   setSelectedID();
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, loading, error };
}
export default useMovie;
