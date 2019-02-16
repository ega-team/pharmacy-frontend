import React from "react";
import styled, { css } from "styled-components";

const StyledTextArea = styled.textarea`
  color: #666;
  outline: none;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-shadow: 0 2px 10px;
  transition: all 0.3s;
  margin-bottom: 15px;
  margin-top: 5px;
  &:focus {
    border: 3px solid skyblue;
  }
  ${props => (props.isMobile
    ? css`
          width: 650px;
          height: 300px;
          font-size: 2.5rem;
        `
    : css`
          width: 400px;
          height: 200px;
          font-size: 1rem;
        `)};
`;

const TextArea = props => (
  <StyledTextArea
    name={props.name}
    isMobile={props.isMobile}
    onChange={props.handleInput}
    placeholder={props.placeholder}
    value={props.value}
  />
);

export default TextArea;
