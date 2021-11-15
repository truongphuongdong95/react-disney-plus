import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMovies } from "../features/movie/movieSlice";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const base_url = "https://image.tmdb.org/t/p/original/";

function ImgSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  const movies = useSelector(selectMovies);

  return (
    <Carousel {...settings}>
      {movies.map((movie) => (
        <Wrap>
           {movie.media_type == "movie" || !movie.media_type   ? (
              <Link to={`/react-disney-plus/detail/${movie.id}`}>
                <img key={movie.id} src={`${base_url}${movie.backdrop_path}`} />
              </Link>
            ) : (
              <Link to={`/react-disney-plus/detail-series/${movie.id}`}>
                <img key={movie.id} src={`${base_url}${movie.backdrop_path}`} />
              </Link>
            )}
        </Wrap>
      ))}
      {/* <Wrap>
          <img src="/images/slider-badging.jpg"/>
      </Wrap>

      <Wrap>
          <img src="/images/slider-badag.jpg"/>
      </Wrap> */}
    </Carousel>
  );
}

export default ImgSlider;

const Carousel = styled(Slider)`
  margin-top: 20px;
  .slick-list {
    overflow: visible;
  }

  li.slick-active button:before {
    color: white;
  }

  ul li button {
    &::before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  button {
    z-index: 1;
  }
`;

const Wrap = styled.div`
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 . 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border: 4px solid transparent;

    &:hover {
      border: 4px solid #fff;
    }
  }
`;
