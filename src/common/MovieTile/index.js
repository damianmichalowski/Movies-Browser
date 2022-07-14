import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormatDate } from "../useFormatDate";
import {
    Content,
    TagsContainer,
    Tag,
    Title,
    RatingContainer,
    Img,
    Rate,
    Votes,
    StyledStar,
    FeaturedDate
} from "./styled";
import { selectMoviesGenres } from "../../features/movies/moviesSlice";

export const MovieTile = ({
    poster,
    title,
    date,
    genreIds,
    rate,
    votes,
    id,
    featured }) => {
    const navigate = useNavigate();
    const year = useFormatDate(date, "year");
    const genres = useSelector(selectMoviesGenres);
    
    return (
        <Content onClick={() => navigate(`../movies/${id}`)}>
            <Img src={poster} alt={title} loading="lazy" />
            <Title>{title}</Title>
            <FeaturedDate>
                {featured && <span>{featured} </span>}
                {date ?
                    <time dateTime={date}>
                        {featured ? `(${year})` : year}
                    </time>
                    :
                    <span>(No release date)</span>
                }
            </FeaturedDate>
            {(genreIds && genres &&
                <TagsContainer>
                    {genres.map((genre) => genreIds.includes(genre.id) && (
                        <Tag key={genre.id}>{genre.name}</Tag>
                    ))}
                </TagsContainer>
            ) || null}
            {(votes && rate &&
                <RatingContainer>
                    <StyledStar />
                    <Rate>{rate}</Rate>
                    <Votes>{votes} votes</Votes>
                </RatingContainer>
            ) || null}
        </Content>
    )
};