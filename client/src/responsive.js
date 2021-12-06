import { css } from "styled-components";
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const fold = (props) => {
  return css`
    @media only screen and (max-width: 285px) {
      ${props}
    }
  `;
};
export const galaxy = (props) => {
  return css`
    @media only screen and (max-width: 365px) {
      ${props}
    }
  `;
};
