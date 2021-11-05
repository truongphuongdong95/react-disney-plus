import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setWatchList } from "../features/movie/movieSlice";
import Swal from "sweetalert2/dist/sweetalert2.js";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Detail() {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  const dispatch = useDispatch();

  const API_KEY = "7f09ec5f5fa9e76babfdaa99c7c75fbc";

  const base_url = "https://image.tmdb.org/t/p/original/";

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    async function getDetailMovie() {
      let movieDetail = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
      setMovie(movieDetail.data);
    }
    getDetailMovie();
  }, [id]);

  //console.log(movie)

  const addWatchList = () => {
    dispatch(setWatchList(movie));

    Toast.fire({
      icon: "success",
      title: "Add watch list successfully",
    });
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClickTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(`${movie?.title}` || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(`${movie.title} trailer offical`);

  return (
    <Container>
      <Background>
        <img src={`${base_url}${movie.backdrop_path}`} />
      </Background>
      <Title>
        <h1>{movie.original_title}</h1>
      </Title>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" />
          <span>Play</span>
        </PlayButton>
        <TrailerButton onClick={() => handleClickTrailer(movie)}>
          <img src="/images/play-icon-white.png" />
          <span>Trailer</span>
        </TrailerButton>
        <AddButton onClick={addWatchList}>
          <span>+</span>
        </AddButton>
        <GroupButton>
          <img src="/images/group-icon.png" />
        </GroupButton>
      </Controls>
      <SubTitle>
        Tag: {movie.tagline} - Release: {movie.release_date}
      </SubTitle>
      <Description>{movie.overview}</Description>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh -70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  height: 16vh;
  min-height: 120px;
  width: 60vw;
  min-width: 200px;
  margin-top: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h1 {
    font-size: 45px;
    line-height: 50px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.button`
  border-radius: 4px;
  padding: 0px 24px;
  margin-right: 22px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const TrailerButton = styled(PlayButton)`
  background: rgb(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`;

const AddButton = styled.button`
  margin-right: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    font-size: 30px;
    color: #fff;
  }
`;

const GroupButton = styled(AddButton)`
  background: rgba(0, 0, 0);
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`;

const Description = styled.div`
  color: rgb(249, 249, 249);
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  max-width: 700px;
`;
