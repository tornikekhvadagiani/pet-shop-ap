import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNav = styled.nav`
  background-color: red;
  width: 300px;
  height: 100%;
  background-color: #111111;
  color: #fff;
  padding: 40px 20px;
`;

export const StyledNavWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  flex-direction: column;
`;
interface StyledLinkProps {
  $isActive?: boolean;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  display: flex;
  background-color: ${({ $isActive }) =>
    $isActive ? "#598eda" : "transparent"};
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 10px;
  img {
    width: 20px;
    filter: invert(1);
  }
`;
