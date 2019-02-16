import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
  color: #666;
  outline: none;
  border: 1px solid #aaa;
  border-radius: 3px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px;
  margin-bottom: 15px;
  margin-top: 5px;
  &:focus {
    border-bottom: 3px solid skyblue;
  }
  ${props => (props.isMobile
    ? css`
          width: 550px;
          height: 60px;
          font-size: 2.5rem;
        `
    : css`
          width: 300px;
          height: 30px;
          font-size: 1rem;
        `)};
`;

const Input = props => (
  <StyledInput
    name={props.name}
    value={props.value}
    isMobile={props.isMobile}
    onChange={props.handleInput}
    placeholder={props.placeholder}
  />
);

export default Input;
