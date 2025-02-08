import { StyledLink, StyledNav } from "./componentsStyles";
import { StyledNavWrapper } from "./componentsStyles";
import { LinksAPI } from "../API/LinksAPI";
import { useState } from "react";
import { ILinks } from "../globalTypes";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<number>(0);

  return (
    <StyledNav>
      <h1>Admin Console</h1>
      <StyledNavWrapper>
        {LinksAPI.map((e: ILinks, i: number) => (
          <StyledLink
            to={e.linkTo}
            $isActive={activeLink === i ? true : false}
            onClick={() => setActiveLink(i)}
          >
            <img src={e.icon} alt="" />
            <p>{e.title}</p>
          </StyledLink>
        ))}
      </StyledNavWrapper>
    </StyledNav>
  );
};

export default Navbar;
