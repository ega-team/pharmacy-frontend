import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import Web3Container from "../lib/Web3Container";
import Loading from "../components/atoms/Loading";
import { SubmitAnswer } from "../components/SubmitAnswer";

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

const Ul = styled.ul`
  list-style: none;
  overflow: hidden;
  margin-top: 0px;
  margin-left: auto;
`;

const Li = styled.li`
  width: 180px;
  text-align: center;
  background-color: #333;
  float: left;
  height: 50px;
  line-height: 50px;
  margin-right: 2px;
`;

const A = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 20px;
`;

const HeaderDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
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
        <HeaderDiv>
          <Ul id="nav">
            <Li>
              <Link href="/index">
                <A>TopPage</A>
              </Link>
            </Li>
            <Li>
              <Link href="/submitHost">
                <A>Submit Problem</A>
              </Link>
            </Li>
            <Li>
              <Link href="/accounts">
                <A>Mypage</A>
              </Link>
            </Li>
          </Ul>
        </HeaderDiv>
        <StyledHeader>Send answer</StyledHeader>
        <SubmitAnswer dataId={"hoge"} accounts={accounts} contract={contract} />
      </StyledAccounts>
    );
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <Loading />}
    render={({ accounts, contract }) => (
      <Accounts accounts={accounts} contract={contract} />
    )}
  />
);
