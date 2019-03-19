import React, { Component } from "react";
import Web3Container from "../lib/Web3Container";
import Loading from "../components/atoms/Loading";
import Link from "next/link";
import Router from "next/router";
import styled, { css, injectGlobal } from "styled-components";
import makeStore from "../store";
import { fetchUsers } from "../actions/users-actions";
import { RequestAnswer } from "../components/RequestAnswer";

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
  font-size: larger;
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
  margin-top: 50px;
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
  width: 400px;
  &:after {
    position: absolute;
    content: " ";
    display: block;
    border-bottom: solid 3px #ffc778;
    bottom: -3px;
    width: 30%;
  }
`;

const Table = styled.table`
  margin-top: 70px;
  border-collapse: collapse;
  width: 60%;
  border-spacing: 0;
  margin-left: auto;
  margin-right: auto;
`;

const Top = styled.tr`
  border: solid 1px #eee;
  cursor: pointer;
`;

const Tr = styled.tr`
  border: solid 1px #eee;
  cursor: pointer;
  &:hover {
    background-color: #d4f0fd;
  }
`;

const Th = styled.th`
  background-color: #a4a4a4;
  border: solid 1px #424242;
  text-align: center;
  width: 25%;
  padding: 15px 0;
`;

const Td = styled.td`
  background-color: #eee;
  border: solid 1px #424242;
  text-align: center;
  width: 25%;
  padding: 15px 0;
`;

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: "BMI",
      themes: []
    };
  }
  static async getInitialProps({ store, pathname, query }) {
    await store.dispatch(fetchUsers());
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

    getThemes() {
        const { contract } = this.props;
        const { option } = this.state;
        contract.methods
            .getAllTheme()
            .call(option)
            .then(res => {
                this.setState({themes: res})
            });
    }

    /*
  async createThemeTable(themes) {
    const { accounts, contract } = this.props;
    this.getThemes();
    const Tables = this.state.themes.map(item => { //this.state.allThemeから取得したものをViewに反映
      return (
        <Tr name={"hoge"}>
          <Td>Eth</Td>
          <Td>BMI</Td>
          <Td>KB</Td>
          <Td>2019/02/</Td>
        </Tr>
      );
    });
    return Tables;
  }
    */

  render() {
    const { accounts, contract } = this.props;
    let Tables
    this.getThemes();
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
                <A>Publish Problem</A>
              </Link>
            </Li>
            <Li>
              <Link href="/accounts">
                <A>Mypage</A>
              </Link>
            </Li>
          </Ul>
        </HeaderDiv>
        <StyledHeader>
          臨床試験解析 アウトソース分散プラットフォーム
        </StyledHeader>
        <Div>
          <SearchBox>
            <Form>
              <Input
                type="text"
                placeholder="キーワードで絞る"
                value={this.state.value}
              />
              <InputButton
                value="    Filter"
                onClick={() => Router.push("/list")}
              />
            </Form>
          </SearchBox>
          <Table>
            <Top>
              <Th>報酬</Th>
              <Th>仕様</Th>
              <Th>データ</Th>
              <Th>期限</Th>
              <Th>解答請求</Th>
            </Top>
        {
            this.state.themes.map((item, key) => { //this.state.allThemeから取得したものをViewに反映
                return (
                    <Tr>
                    <Td>{item.reward}Wei</Td>
                    <Td>{item.specification}</Td>
                    <Td>{item.data_header}</Td>
                    <Td>{item.limited_time}</Td>
                    <Td><RequestAnswer themeId={key} accounts={accounts} contract={contract} ></RequestAnswer></Td>
                    </Tr>
                )
            })
        }
          </Table>
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
