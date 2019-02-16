import { css, keyframes } from "styled-components";

export const media = {
  desktop: (...args) => css`
    @media (min-width: 1025px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)};
    }
  `,
  phone: (...args) => css`
    @media (max-width: 568px) {
      ${css(...args)};
    }
  `
};
