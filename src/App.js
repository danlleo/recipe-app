import React from "react";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import styled from "styled-components";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>WS Recipes</Logo>
      </Nav>

      <Search />
      <Category />
      <Pages />
    </Router>
  );
};

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

export default App;
