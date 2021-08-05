import styled from "styled-components";
import Movie  from "./Component/Movie";
import MovieInfo from "./Component/MovieInfo";
import React, { useState} from 'react';
import Axios from "axios";



const API_KEY = 'c7d74ded';

//using styled-components library, creating styled objects and using them as JSX elements_tags
const Container = styled.body`
display : flex;
flex-direction : column; 

`;
const AppName = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const Header = styled.div`
display: flex;
flex-direction: row;

color: white;
padding: 10px;
height:45px;
font-weight : bold;
align-items: center; 
justify-content:space-between;
font-family: 'Style Script', cursive;
font-size: 55px;
border-radius: 0px;
background: #383939;

`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  justify-content: center;
  width: 30%;
  border-radius: 15px;
  margin-left: 20px;
  border : 5px
  border-outline: black;
  border-style: double;
  
`;
const SearchInputBox = styled.input`

  margin-left: 15px;
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  width: 100%;
`;

const MovieList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap:24px;
 justify-content: space-evenly;
 background-color: #bbdddd;
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



function App() {

  const [SearchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();


  //debouncing - wait for the user to stop typing search query

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );

    updateMovieList(response.data.Search);
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  }

  return (
    <Container>
      <Header>
        <AppName>
          Movify
        </AppName>
        <SearchBox>
          <SearchInputBox 
            onChange = {onTextChange} 
            placeholder="Type Movie name..."
            value={SearchQuery}>
          </SearchInputBox>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} ></MovieInfo>}
        <MovieList>
         {movieList?.length
         ? movieList.map((movie, index) =>( <Movie key={index} 
                                              movie = {movie} onMovieSelect={onMovieSelect} query={SearchQuery} />
        )):
         <MovieName>"Movie Not found!"</MovieName>} 
        </MovieList>
    </Container>
  );
}

export default App;
