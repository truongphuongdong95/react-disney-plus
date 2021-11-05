import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies:[],
    watchList:[],
    searchList:[],
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers:{
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setWatchList: (state, action) => {
            state.watchList = [...state.watchList, action.payload];
            localStorage.setItem("watchlist", JSON.stringify(state.watchList));
        },
        setSearchList: (state, action) => {
            state.searchList = action.payload
        },
    }

})

export const {setMovies, setWatchList, setSearchList} = movieSlice.actions;

export const selectMovies = (state) => state.movie.movies;
export const selectWatchList = (state) => state.movie.watchList;
export const selectSearchList = (state) => state.movie.searchList;

export default movieSlice.reducer;