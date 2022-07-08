import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: 1,
    searchPage: 1,
    pageCount: 500,
    moviesList: [],
    moviesGenres: [],
    fetchStatus: "initiated",
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchGenres: () => { },
        fetchGenresSuccess: (state, { payload }) => {
            state.moviesGenres = payload.genres;
        },
        fetchMovies: (state) => {
            state.fetchStatus = "initiated";
        },
        fetchMoviesSuccess: (state, { payload }) => {
            state.moviesList = payload.movies.results;
            state.page = payload.movies.page;
            state.pageCount = payload.movies.total_pages;
            state.fetchStatus = "completed";
        },
        fetchSearchedMovies: (state) => {
            state.fetchStatus = "initiated";
        },
        fetchSearchedMoviesSuccess: (state, { payload }) => {
            state.moviesList = payload.movies.results;
            state.searchPage = payload.movies.page;
            state.pageCount = payload.movies.total_pages;
            state.fetchStatus = "completed";
        },
        fetchError: (state) => {
            state.fetchStatus = "error";
        },
        setPage: (state, { payload }) => {
            state.page = payload;
        },
        setSearchPage: (state, { payload }) => {
            state.searchPage = payload;
        },
    },
});

export const {
    fetchGenres,
    fetchGenresSuccess,
    fetchMovies,
    fetchMoviesSuccess,
    fetchSearchedMovies,
    fetchSearchedMoviesSuccess,
    fetchError,
    setPage,
    setSearchPage,
} = moviesSlice.actions;

export const selectPage = (state) => state.movies.page;

export const selectSearchPage = (state) => state.movies.searchPage;

export const selectPageCount = (state) => state.movies.pageCount;

export const selectMoviesList = (state) => state.movies.moviesList;

export const selectMoviesGenres = (state) => state.movies.moviesGenres;

export const selectFetchStatus = (state) => state.movies.fetchStatus;

export default moviesSlice.reducer;
