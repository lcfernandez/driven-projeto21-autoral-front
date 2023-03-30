import { BLACK_COLOR } from "../constants/color";
import { LOGO_FONT } from "../constants/fonts";
import { Logout, Projects } from 'grommet-icons';
import styled from "styled-components";

export function HeaderApp(){
  return (
    <HeaderAppContainer>
      <div>Moodtasks</div>
      <NavBar>
        <Projects color={BLACK_COLOR} />
        <Logout color={BLACK_COLOR} />
      </NavBar>
    </HeaderAppContainer>
  );
}

const HeaderAppContainer = styled.div`
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
