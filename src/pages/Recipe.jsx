import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styled from "styled-components";

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const params = useParams();

  const getDetails = async () => {
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API}`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw error;
      });

    setDetails(data);
  };

  useEffect(() => {
    getDetails();
  }, [params.name]);

  return (
    <DetailWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.institutions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details?.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
