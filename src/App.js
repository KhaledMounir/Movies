import { useState, useEffect } from "react";
import styled from "styled-components";
import "./app.css";
import MovieCard from "./MoviesCard";
import searchIcon from "./search.svg";

const Arrow = styled.span`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f9d3b4;
  text-transform: uppercase;
  margin: 0px 20px;
  background: #343739;
  cursor: pointer;
`;

const API = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("all");
  const [page, setPage] = useState(1);
  const searchMovies = async (title) => {
    const res = await fetch(`${API}&s=${title}&page=${page}`);
    const data = await res.json();
    setMovies(data.Search);
  };

  const handlClick = (r) => {
    r === "left"
      ? page === 1
        ? setPage(10)
        : setPage((prev) => prev - 1)
      : page === 10
      ? setPage(1)
      : setPage((prev) => prev + 1);
  };

  const handlShearch = () => {
    searchMovies(title);
  };

  useEffect(() => {
    searchMovies(title);
  }, [page]);

  return (
    <div className="app">
      <h1>FamilyMovies</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(title)}
        />
      </div>

      {movies?.length > 0 ? (
        <>
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>

          <div className="container">
            <Arrow onClick={() => handlClick("left")}>Precedent</Arrow>
            <Arrow onClick={() => handlClick("right")}>Next</Arrow>
          </div>
        </>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
