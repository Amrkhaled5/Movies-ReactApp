import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Box from "./Box";
// import RightBox from "./RightBox";
import LeftMovieList from "./LeftMovieList";
import MyHistory from "./MyHistory";
import RightMoviesList from "./RightMoviesList";
import SelectedMovieDetails from "./SelectedMovieDetails";
import Loading from "./Loading";
import useMovie from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState(function () {
  //   const storedMovies = localStorage.getItem("watchedMovies");
  //   return JSON.parse(storedMovies);
  // });

  function handleWatchedMovies(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeletWatchedMovie(id) {
    setWatched((w) => w.filter((m) => m.imdbID !== id));
  }
  // useEffect(
  //   function () {
  //     localStorage.setItem("watchedMovies", JSON.stringify(watched));
  //   },
  //   [watched]
  // );
  const { movies, loading, error } = useMovie(query, setSelectedID);

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <LeftMovieList movies={movies} setSelectedID={setSelectedID} />
          )}
        </Box>
        <Box>
          {selectedID ? (
            <SelectedMovieDetails
              selectedID={selectedID}
              onCloseMovie={setSelectedID}
              watchedMovie={handleWatchedMovies}
              watched={watched}
            />
          ) : (
            <>
              <MyHistory watched={watched} />
              <RightMoviesList
                watched={watched}
                selectedID={selectedID}
                deletMovie={handleDeletWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
