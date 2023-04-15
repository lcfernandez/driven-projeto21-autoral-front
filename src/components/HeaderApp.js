import { BLACK_COLOR, WHITE_COLOR } from "../constants/color";
import { LOGO_FONT } from "../constants/fonts";
import { UserContext } from "../contexts/UserContext";
import { Logout } from "grommet-icons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function HeaderApp(){
  const [, setToken] = useContext(UserContext);

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    setToken(undefined);
    navigate("/");
  }

  return (
    <HeaderAppContainer>
      <div onClick={() => navigate("/projects")}>Moodtasks</div>
      <LogoutStyled color={WHITE_COLOR} onClick={signOut} />
    </HeaderAppContainer>
  );
}

const HeaderAppContainer = styled.div`
  background-color: ${BLACK_COLOR};
  color: ${WHITE_COLOR};
  display: flex;
  height: 5rem;
  font-family: ${LOGO_FONT};
  font-size: 3rem;
  justify-content: space-between;
  padding: 1rem;
  text-align: center;

  div:first-child {
    cursor: pointer;
  }
`;

const LogoutStyled = styled(Logout)`
  cursor: pointer;
  height: 100%;
  margin: 0 0.5rem;
`;
