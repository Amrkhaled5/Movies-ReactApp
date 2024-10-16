import LeftMovie from "./LeftMovie";
function LeftMovieList({ movies, setSelectedID }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <LeftMovie
          movie={movie}
          key={movie.imdbID}
          setSelectedID={setSelectedID}
        />
      ))}
    </ul>
  );
}
export default LeftMovieList;
