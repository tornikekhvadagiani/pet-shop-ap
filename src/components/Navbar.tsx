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

  useEffect(() => {
    if (currentLocation.pathname === "/") {
      navigate("/Main/Animals", { replace: true });
    }

    const matchingLink = LinksAPI.find(
      (e) =>
        currentLocation.pathname === e.linkTo ||
        currentLocation.pathname.startsWith(`${e.linkTo}/`)
    );

    if (matchingLink) {
      setActiveLink(matchingLink.id);
    } else {
      setActiveLink(-1);
    }

    window.scrollTo(0, 0);
  }, [currentLocation]);
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
