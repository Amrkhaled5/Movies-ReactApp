import { useEffect, useRef } from "react";
import { useKey } from "./useKey";
function Search({ query, setQuery, movies }) {
  const inputEl = useRef(null);
  useKey("Enter", function () {
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </>
  );
}
export default Search;
