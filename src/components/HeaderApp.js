import { BLACK_COLOR, WHITE_COLOR } from "../constants/color";
import { LOGO_FONT } from "../constants/fonts";
import { UserContext } from "../contexts/UserContext";
import { Logout, Projects } from "grommet-icons";
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
      <div>Moodtasks</div>
      <NavBar>
        <Projects color={WHITE_COLOR} />
        <Logout color={WHITE_COLOR} onClick={signOut}/>
      </NavBar>
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
`;

const NavBar = styled.div`
  * {
    cursor: pointer;
    height: 100%;
    margin: 0 0.5rem;
  }
`;
