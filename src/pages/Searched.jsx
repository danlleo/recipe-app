import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();

  useEffect(() => {
    getSearched();
  }, [params.dish]);

  const getSearched = async () => {
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API}&query=${params.dish}`
      )
      .then((response) => {
        console.log(response);
        return response.data.results;
      })
      .catch((error) => {
        throw error;
      });

    setSearchedRecipes(data);
  };

  return (
    <Grid>
      {searchedRecipes.map((recipe) => (
        <Card key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt="" />
            <h4>{recipe.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
