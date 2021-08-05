import styled from "styled-components";

const MovieContainer = styled.div `
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 250px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer;
    border-radius: 0px;
    background: #bbdddd;
    box-shadow:  28px 28px 56px #839b9b,
             -28px -28px 56px #f3ffff;
    
`;

const CoverImage = styled.img`
    object-fit: cover;
    height: 362px;
`;

const MovieName = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
`;

const Info = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

`;

const Movie = (props) => {

    const {Title, Year, imdbID, Poster} = props.movie;
    const query = props.query;
    const parts = Title.split(new RegExp(`(${query})`, 'gi'));
    const Highlighted =     <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === query.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
     
    return (
        <MovieContainer onClick={()=> props.onMovieSelect(imdbID)}>
            <CoverImage src={Poster} alt="  Poster missing!">
            </CoverImage>
            <MovieName>{Highlighted}</MovieName>
            <Info>Year: {Year}</Info>
        </MovieContainer>
    )
    
}

export default Movie;