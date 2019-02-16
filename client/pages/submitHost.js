import React from "react";
import Link from "next/link";
import { Provider } from "react-redux";
import styled, { css } from "styled-components";
import Web3Container from "../lib/Web3Container";
import { SubmitProblem } from "../components/SubmitProblem";
// import { SubmitDropzone } from '../components/Dropzone';

const StyledAccounts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h1`
  color: #fff;
  border-bottom: solid 3px skyblue;
  position: relative;
  text-align: center;
  width: 300px;
  &:after {
    position: absolute;
    content: " ";
    display: block;
    border-bottom: solid 3px #ffc778;
    bottom: -3px;
    width: 30%;
  }
`;

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // ここにaccoutとcontractが入ってくる
    const { accounts, contract } = this.props;
    return (
      <StyledAccounts>
        <StyledHeader>Post a problem</StyledHeader>
        <SubmitProblem />
      </StyledAccounts>
    );
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ accounts, contract }) => (
      <Accounts accounts={accounts} contract={contract} />
    )}
  />
);
