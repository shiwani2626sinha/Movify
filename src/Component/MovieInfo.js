import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const API_KEY = 'c7d74ded';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`;

const Close = styled.span`
right: 32px;
top: 32px;
width: 32px;
height: 32px;
opacity: 1;
color: black;
cursor:pointer
font-size: large;
`;

const CoverImage = styled.img`
    object-fit: cover;
    height: 362px;
`;
const Info = styled.span`
    display: flex;
    flex-direction: column;
    margin: 20px;

`;

const MovieName = styled.span`
    font-size: 18px;
    font-weight: 500;
    color: black;
    text-transform: capitalize;
    
`;
const MovieInfoContainer = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    overflow: hidden;
    margin: 4px 0;
    text-transform: capitalise;
    text-overflow: ellipsis;
    & span {
        opacity: 0.6;
    }
`;


const MovieInfo = (props) => {

    const [movieDetail, setDetail] = useState();
    const { selectedMovie } = props;

    useEffect(()=>{axios.get
        (`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,)
        .then((response)=>{setDetail(response.data)});
    }, [selectedMovie]
    );

     return <Container>
                {movieDetail?
                <>
                    <CoverImage src={movieDetail?.Poster}></CoverImage>
                <Info>
                    <MovieName>{movieDetail?.Type}: {movieDetail?.Title}</MovieName>
                    <MovieInfoContainer>
                        IMDB Rating : <span>{movieDetail?.imdbRating}</span>
                    </MovieInfoContainer>
                    <MovieInfoContainer>
                        Language : <span>{movieDetail?.Language}</span>
                    </MovieInfoContainer>
                    <MovieInfoContainer>
                        Released : <span>{movieDetail?.Released}</span>
                    </MovieInfoContainer>
                    <MovieInfoContainer>
                        Genre : <span>{movieDetail?.Genre}</span>
                    </MovieInfoContainer>
                    <movieDetail>
                        Actors : <span>{movieDetail?.Actors}</span>
                    </movieDetail>
                    <movieDetail>
                        Plot : <span>{movieDetail?.Plot}</span>
                    </movieDetail>
                </Info>
                <Close onClick={()=> props.onMovieSelect()}>X</Close>
                </>
                    :"Loading..."}
                
            </Container>
 };

 export default MovieInfo;