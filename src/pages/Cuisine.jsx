import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();

  useEffect(() => {
    getCuisine();
  }, [params.type]);

  const getCuisine = async () => {
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API}&cuisine=${params.type}`
      )
      .then((result) => {
        return result.data.results;
      })
      .catch((error) => {
        throw error;
      });

    setCuisine(data);
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {cuisine.map((item) => (
        <Card key={item.id}>
          <Link to={`/recipe/${item.id}`}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled(motion.div)`
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

export default Cuisine;
