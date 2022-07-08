import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {
    fetchGenres,
    fetchMovies,
    fetchSearchedMovies,
    selectFetchStatus,
    selectMoviesGenres,
    selectMoviesList,
} from "../moviesSlice";
import { MovieTile } from "./MovieTile";
import { Content, Title, Wrapper } from "./styled";
import { Pagination } from "../../../common/Pagination";
import { ErrorPage } from "../../../common/ErrorPage";
import { useQueryParameter } from "../../../common/useQueryParameter";
import Loader from "../../../common/Loader";

export const MovieList = () => {
    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectFetchStatus);
    const movies = useSelector(selectMoviesList);
    const genres = useSelector(selectMoviesGenres);
    const { page } = useParams();
    const searchQuery = useQueryParameter("search");

    useEffect(() => {
        if (!genres.length > 0) {
            dispatch(fetchGenres());
        } else if (searchQuery) {
            dispatch(fetchSearchedMovies({ query: searchQuery }));
        } else {
            dispatch(fetchMovies());
        }
    }, [dispatch, page, searchQuery, genres]);

    switch (fetchStatus) {
        case "completed":
            return (
                <Content>
                    <Title>{searchQuery ? `Search results for ${searchQuery}` : "Popular movies"}</Title>
                    <Wrapper>
                        {movies.map((movie) =>
                            <MovieTile
                                key={movie.id}
                                id={movie.id}
                                poster={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                title={movie.title}
                                date={movie.release_date}
                                tags={movie.genre_ids.map(
                                    (genreId) => genres.find(
                                        (genre) => genre.id === genreId).name
                                )
                                }
                                rate={movie.vote_average}
                                votes={movie.vote_count}
                            />
                        )}
                    </Wrapper>
                    <Pagination />
                </Content>
            );
        case "error":
            return (<ErrorPage />);
        default:
            return (
                <Content>
                    {searchQuery && <Title>Search results for {searchQuery}</Title>}
                    <Loader />
                </Content>
            );
    }

};