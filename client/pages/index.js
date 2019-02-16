import React, { Component } from "react";
import Web3Container from "../lib/Web3Container";
import Loading from "../components/atoms/Loading";
import Link from "next/link";
import Router from "next/router";
import styled, { css, injectGlobal } from "styled-components";
import makeStore from "../store";
import { fetchUsers } from "../actions/users-actions";

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    background-color: rgb(27, 27, 27);
    font-family: sans-serif;
  }
  body {
    margin: 0;
  }
`;

const Form = styled.form`
max-width: 400px;
margin-left: auto;
margin-right: auto;
margin-bottom:20px;
display: flex;
flex-direction:
justify-content:
align-items: center;
position:relative; 	
`;

const Input = styled.input`
  outline: 0;
  height: 50px;
  padding: 0 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 300px;
  border-radius: 2px;
  background: #eee;
`;

const InputButton = styled.input`
  width: 70px;
  height: 50px;
  position: absolute;
  left: 340px;
  top: 3px;
  border-radius: 2px;
  background: #7fbfff;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: none;
  &:hover {
    background: #eee;
    color: #7fbfff;
  }
`;
const SearchBox = styled.div`
  width: 100%;
`;
const Div = styled.div`
  margin-top: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.div`
  margin-top: 100px;
`;

const Ul = styled.ul`
  list-style: none;
  overflow: hidden;
  margin-top: 0px;
  margin-left: auto;
`;

const Li = styled.li`
  width: 170px;
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
  position: relative;
  display: flex;
  width: auto;
`;

const StyledHeader = styled.h1`
  margin: auto;
  margin-top: 100px;
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

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  static async getInitialProps({ store, pathname, query }) {
    await store.dispatch(fetchUsers());
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { accounts, contract } = this.props;
    return (
      <div>
        <HeaderDiv>
          <Ul id="nav">
            <Li>
              <Link href="/submit">
                <A>Submit</A>
              </Link>
            </Li>
            <Li>
              <Link href="/submitHost">
                <A>Submit Host</A>
              </Link>
            </Li>
            <Li>
              <Link href="/accounts">
                <A>Mypage</A>
              </Link>
            </Li>
          </Ul>
        </HeaderDiv>
        <StyledHeader>Next.js</StyledHeader>
        <Div>
          <SearchBox>
            <Form>
              <Input
                type="text"
                placeholder="キーワードを入力"
                value={this.state.value}
              />
              <InputButton
                value="  Search"
                onClick={() => Router.push("/list")}
              />
            </Form>
          </SearchBox>
          <ImgDiv>
            <img src="../static/user.jpg" />
          </ImgDiv>
          <pre>{JSON.stringify(accounts[0], null, 4)}</pre>
        </Div>
      </div>
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
