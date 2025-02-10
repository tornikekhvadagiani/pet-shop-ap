import { Link } from "react-router-dom";
import { fetchLinks } from "../../../API/fetchLinks";
import { StyledBlueButton } from "../../../GlobalStyles";
import { StyledManageHeader } from "../MainPageStyles";

const ManageHeader = () => {
  interface links {
    title: string;
    linkTo: string;
  }
  return (
    <StyledManageHeader>
      {fetchLinks.map((e: links) => (
        <Link to={e.linkTo} key={e.linkTo}>
          <StyledBlueButton>{e.title}</StyledBlueButton>
        </Link>
      ))}
    </StyledManageHeader>
  );
};

export default ManageHeader;
