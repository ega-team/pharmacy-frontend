import React from "react";
import classNames from "classnames";
import ReactDropzone from "react-dropzone";
import { keccak256 } from "web3-utils";
import styled, { css, injectGlobal } from "styled-components";
import Encoding from "encoding-japanese";
import Button from "./atoms/Button";

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

const DropZoneContainer = styled.div`
  height: 80px;
  width: 500px;
  border: 2px dashed rgb(135, 206, 235);
  padding: 30px;
  font-size: 20px;
  ${props =>
    props.isDragActive &&
    css`
      border-color: green;
    `}
`;

const FileDropZone = styled(ReactDropzone)`
  position: relative;
  width: 300px;
  height: 300px;
  border-width: 2px;
  border-color: rgb(102, 102, 102);
  border-style: dashed;
  border-radius: 10px;
  margin: 20px;
  overflow: hidden;
  .hint {
    position: absolute;
    top: 45%;
    width: 100%;
    padding: 0 20px;
    text-align: center;
  }
`;

const StyledSubmitAnswer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 15%;
  height: 20%;
  margin-left: 45px;
  margin-right: 15px;
`;
const Text = styled.p`
  color: #fff;
`;

export class requestAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeId: props.themeId,
      accounts: props.accounts,
      contract: props.contract,
    };
  }
  handleSubmit() {
    const { themeId, contract } = this.state;
    console.log("submit");
    const ts = new Date().getTime();
    const ts2 = Math.floor(ts / 1000);
    const option = {
      from: this.state.accounts[0],
      gasPrice: "20000000000", // このトランザクションで支払う1ガス当たりの価格。単位は wei。
      gas: "4000000",
      nonce: ts2 // ガスリミット。このトランザクションで消費するガスの最大量。
    };
    contract.methods
      .getCurrentAnswer(themeId)
      .call(option)
      .then(res => {
        console.log(res);
      });
  }
  render() {
    return (
      // <StyledSubmitAnswer>
        <Button handleClick={this.handleSubmit.bind(this)} text="回答を確認する" />
      // </StyledSubmitAnswer>
    );
  }
}
