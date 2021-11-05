import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "../axios";
import requests from "../requests";
import { setSearchList } from "../features/movie/movieSlice";

function SearchForm() {

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  //console.log(searchText)

  const inputSearchChanged = async (e) => {
    e.preventDefault();
    
    setSearchText(e.target.value);

    let searchMovies = await axios(
      requests.fetchSearchMovies+`&query=${searchText}`
    );
    //console.log(searchMovies.data.results);

    dispatch(setSearchList(searchMovies.data.results))
  };

  const getSearch = async () => {};

  return (
    <Form>
      <form onSubmit={inputSearchChanged}>
        <input
          onChange={inputSearchChanged}
          value={searchText}
          placeholder="Search movies..."
        />
      </form>
    </Form>
  );
}

export default SearchForm;

const Form = styled.div`
  display: block;
  margin: 10px auto;

  input {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-size: 1.5em;
    padding: 0 10px;

    ::placeholder {
      color: #fff;
      font-size: 1em;
    }
  }
`;
