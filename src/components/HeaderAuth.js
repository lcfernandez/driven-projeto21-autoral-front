import styled from "styled-components";
import { LOGO_FONT, TITLE_FONT } from "../constants/fonts";

export function HeaderAuth() {
  return (
    <HeaderAuthContainer>
      <Logo>
        Moodtasks
      </Logo>
      <Slogan>
        Inspiração e organização em um só lugar
      </Slogan>
    </HeaderAuthContainer>
  );
}

const HeaderAuthContainer = styled.div`
  margin: 5rem 0 5rem 0;
  text-align: center;
  width: 100vw;

  @media (max-width: 600px) {
    margin: 5rem 0 2.5rem 0;
  }
`;

const Logo = styled.div`
  font-family: ${LOGO_FONT};
  font-size: 5.7rem;

  @media (max-width: 600px) {
    font-size: 4rem;
  }
`;

const Slogan = styled.div`
  font-family: ${TITLE_FONT};
  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;
