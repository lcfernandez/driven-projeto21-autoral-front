import styled from "styled-components";
import { LOGO_FONT, TITLE_FONT } from "../constants/fonts";

export function Header() {
  return (
    <HeaderContainer>
      <Logo>
        Moodtasks
      </Logo>
      <Slogan>
        Inspiração e organização em um só lugar
      </Slogan>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  text-align: center;
  margin: 2rem;
`;

const Logo = styled.div`
  font-family: ${LOGO_FONT};
  font-size: 5.7rem;
`;

const Slogan = styled.div`
  font-family: ${TITLE_FONT};
  font-size: 2rem;
`;
