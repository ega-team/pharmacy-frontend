import React from "react";
import styled, { css } from "styled-components";
import { media } from "../../../utile/Helper";

const TextStyle = styled.a`
  color: #fff;
  font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ,
    Meiryo, "ＭＳ Ｐゴシック", sans-serif;
  box-sizing: border-box;
`;

const Text = props => (
  <TextStyle
    isCareer={props.isCareer}
    isStart={props.isStart}
    isTop={props.isTop}
    isError={props.isError}
    isMust={props.isMust}
  >
    {props.text}
  </TextStyle>
);

export default Text;
