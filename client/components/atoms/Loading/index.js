import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

export const LoadingContent = styled.p`
  width: 150px;
  height: 150px;
  border: 4px solid #00f;
  border-top-color: rgba(0, 0, 0, 0.23);
  border-radius: 100%;
  animation: ${rotate360} 0.6s linear infinite;
  background-color: rgba(0, 0, 0, 0.23);
  box-sizing: border-box;
`;

const Loading = () => (
  <LoadingContainer>
    <LoadingContent />
  </LoadingContainer>
);

export default Loading;
