import RightMovie from "./RightMovie";
function RightMoviesList({ watched, selectedID, deletMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <RightMovie movie={movie} key={movie.imdbID} deletMovie={deletMovie} />
      ))}
    </ul>
  );
}
export default RightMoviesList;
