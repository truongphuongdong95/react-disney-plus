import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectSearchList, setMovies } from '../features/movie/movieSlice';
import Movies from './Movies';
import SearchForm from './SearchForm';

function Search() {

    const searchList = useSelector(selectSearchList);

    //console.log(searchList)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMovies(searchList));
        
    }, [searchList])

    return (
        <Container>
            <SearchForm />
            <Movies title="Search Results:"/>
        </Container>
    )
}

export default Search

const Container = styled.main `
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;

    &::before{
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index: -1;
    }
`;