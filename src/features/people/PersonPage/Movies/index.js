import { useSelector } from "react-redux";
import { MovieTile } from "../../../movies/MovieList/MovieTile";
import { selectMoviesGenres } from "../../../movies/moviesSlice";
import { Content, Title, Wrapper } from "./styled";

export const Movies = (props) => {
    const { header, list } = props;
    const genres = useSelector(selectMoviesGenres);
    console.log(list)
    return (
        <Content>
            <Title>Movies - {header} ({list.length})</Title>
            <Wrapper>
                {list.map((movie) =>
                    <MovieTile key={list.indexOf(movie)}
                        title={movie.title || movie.name}
                        date={movie.release_date}
                        poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null}
                        tags={movie.genre_ids.map(
                            (genreId) => genres.find(
                                (genre) => genre.id === genreId).name
                            )
                        }
                        rate={movie.vote_average}
                        votes={movie.vote_count}
                        featured={movie.character || movie.job}
                        id={movie.id}
                    />
                )}
            </Wrapper>
        </Content>
    );
};