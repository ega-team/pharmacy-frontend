import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  
                width: 200px;
                margin-left: auto;
                margin-right: auto;
height: 50px;
          font-size: 1rem;
  &:hover {
    background-color: #fba234;
  }
  background-color: #fba234;
  border-radius: 5px;
`;

const Button = props => (
  <StyledButton isMobile={props.isMobile} isModal={props.isModal} onClick={props.handleClick}>
    {props.text}
  </StyledButton>
);

export default Button;
