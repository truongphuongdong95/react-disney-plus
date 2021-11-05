import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMovies } from "../features/movie/movieSlice";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function Movies(props) {
  const movies = useSelector(selectMovies);
  console.log(movies);

  return (
    <Container>
      <h4>{props.title}</h4>
      <Content>
        {movies.map((movie) => (
          <Wrap>
            {movie.media_type == "movie" || !movie.media_type   ? (
              <Link to={`/detail/${movie.id}`}>
                <img key={movie.id} src={`${base_url}${movie.poster_path}`} />
              </Link>
            ) : (
              <Link to={`/detail-series/${movie.id}`}>
                <img key={movie.id} src={`${base_url}${movie.poster_path}`} />
              </Link>
            )}
          </Wrap>
        ))}
      </Content>
    </Container>
  );
}

export default Movies;

const Container = styled.div``;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 60px;
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 /73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
