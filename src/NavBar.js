import { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
function NavBar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} movies={movies} />
    </nav>
  );
}

export default NavBar;
