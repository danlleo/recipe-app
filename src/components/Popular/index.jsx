import { useEffect, useState } from "react";
import axios from "axios";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API}&number=9`
      )
      .then((response) => {
        return response.data.recipes;
      })
      .catch((error) => {
        throw error;
      });

    setPopular(data);
  };

  return (
    <div>
      {popular.map((recipe) => (
        <div key={recipe.id}>
          <p>{recipe.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Popular;
