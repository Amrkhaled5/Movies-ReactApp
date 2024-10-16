import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loading from "./Loading";
import { useKey } from "./useKey";
const KEY2 = "2430f1ab";
function SelectedMovieDetails({
  selectedID,
  onCloseMovie,
  watchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isloading, setloading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const isWatched = watched.map((m) => m.imdbID).includes(selectedID);
  const myRating = watched.find((m) => m.imdbID === selectedID)?.userRating;
  useEffect(
    function () {
      async function getMovieData() {
        setloading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY2}&i=${selectedID}`
        );
        const data = await res.json();
        setMovie(data);
        setloading(false);
      }
      getMovieData();
    },
    [selectedID]
  );

  function handleAdd() {
    const newWatedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    watchedMovie(newWatedMovie);
    onCloseMovie();
  }
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "Movie Site";
      };
    },
    [title]
  );

  useKey("Escape", onCloseMovie);

  return (
    <div className="details">
      {isloading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie(null)}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>💫</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <>
                <div className="rating">
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                </div>
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            ) : (
              <p>You rated with movie {myRating} 💫</p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starting {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default SelectedMovieDetails;
