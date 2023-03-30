import { BLACK_COLOR, WHITE_COLOR } from "../../constants/color";
import { TEXT_FONT } from "../../constants/fonts";
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-family: ${TEXT_FONT};
  font-size: 1.2rem;
  margin: 0 auto;
  width: 28rem;

  a {
    color: ${BLACK_COLOR};
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
  }

  button {
    background-color: ${BLACK_COLOR};
    border: 0.15rem solid ${BLACK_COLOR};
    border-radius: 0.3rem;
    color: ${WHITE_COLOR};
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
    height: 3rem;
    margin: 3rem auto;
    transition-duration: 0.5s;
    width: 16rem;

    :hover {
      background-color: ${WHITE_COLOR};
      color: ${BLACK_COLOR};
    }
  }

  input {
    border-style: hidden hidden solid hidden;
    font-family: inherit;
    font-size: inherit;
    height: 3rem;
    padding: 0 0.5rem;

    :focus{
      outline: none;
    }
  }
`;
