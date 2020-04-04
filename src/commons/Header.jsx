import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Icon } from "./icon";
import images from "../styles/img";

export const Header = () => {
  return (
    <Container>
      <Logo>NotesApp</Logo>
      <div>
        <StyledNavLink exact to="/">
          Actual
        </StyledNavLink>
        <StyledNavLink to="/archive">
          <Icon src={images.box} alt="archive icon" />
          Archive
        </StyledNavLink>
        <StyledNavLink to="/create">
          <Icon src={images.plus} alt="plus icon" />
          Create
        </StyledNavLink>
      </div>
    </Container>
  );
};

const Container = styled.header`
  background: #f8f8f8;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  color: black;
  text-decoration: none;
  margin: 0 15px;
  padding: 10px 15px;
  min-width: 150px;
  text-align: center;
  background-color: white;
  border-radius: 20px;
  border: 2px solid transparent;
  transition: all 0.3 ease-out;

  span {
    margin-right: 10px;
  }

  &.active {
    border-color: #d32727;
  }
`;
