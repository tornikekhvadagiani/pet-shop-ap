import { StyledLink, StyledNav } from "./componentsStyles";
import { StyledNavWrapper } from "./componentsStyles";
import { LinksAPI } from "../API/LinksAPI";
import { useEffect, useState } from "react";
import { ILinks } from "../globalTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<number>(-1);
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const matchingLink = LinksAPI.find((e) =>
      currentLocation.pathname.includes(e.linkTo)
    );
    if (currentLocation.pathname == "/") {
      navigate("/Main/Animals");
    }

    if (matchingLink) {
      setActiveLink(matchingLink.id);
    }

    window.scrollTo(0, 0);
  }, [currentLocation.pathname]);

  return (
    <StyledNav>
      <h1>Admin Console</h1>
      <StyledNavWrapper>
        {LinksAPI.map((e: ILinks, i: number) => (
          <StyledLink
            key={i}
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
