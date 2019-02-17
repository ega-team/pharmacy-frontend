import React from "react";
import Loading from "../components/atoms/Loading";
import styled, { css, injectGlobal } from "styled-components";
import Web3Container from "../lib/Web3Container";

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    background-color: #fff;
    font-family: sans-serif;
  }
  body {
    margin: 0;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
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
  text-align: center;
  width: 25%;
  padding: 15px 0;
`;

const Td = styled.td`
  text-align: center;
  width: 25%;
  padding: 15px 0;
`;

const StyledHeader = styled.h1`
  color: #000;
  border-bottom: solid 3px skyblue;
  position: relative;
  text-align: center;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
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
    const { accounts, contract } = props;
    const ts = new Date().getTime();
    const ts2 = Math.floor(ts / 1000);
    const option = {
      from: accounts[0],
      gasPrice: "20000000000", // このトランザクションで支払う1ガス当たりの価格。単位は wei。
      gas: "4000000",
      nonce: ts2 // ガスリミット。このトランザクションで消費するガスの最大量。
    };
    this.state = {
      option
    };
    contract.methods.getAllTheme().call(option).then((res)=>{
      console.log(res)
      this.state = {
        option,
        allTheme: res,
      }
    })
  }
  handleClick(e) {
    console.log(e.target.name);
    const { contract } = this.props;
    const { option } = this.state;
    contract.methods
      .getTheme(1)
      .call(option)
      .then(res => {
        console.log(res);
      });
  }
  createThemeTable() {
    const { accounts, contract } = this.props;
    const Tables = [0, 1, 2].map(item => {
      // Tables = this.state.allTheme.map(item => { //this.state.allThemeから取得したものをViewに反映
      return (
        <Tr onClick={this.handleClick.bind(this)} name={"hoge"}>
          <Td>{0.5}Eth</Td>
          <Td>hogehoge</Td>
          <Td>hogehoge</Td>
        </Tr>
      );
    });
    return Tables;
  }
  render() {
    const Tables = this.createThemeTable();
    return (
      <div>
        <StyledHeader>問題一覧</StyledHeader>
        <Table>
          <Top>
            <Th>報酬</Th>
            <Th>仕様</Th>
            <Th>データ</Th>
          </Top>
          {Tables}
        </Table>
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
