import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import ReactDropzone from "react-dropzone";
import styled, { css, injectGlobal } from "styled-components";
import Encoding from "encoding-japanese";
import Button from "./atoms/Button";
import InquiryForm from "./organisms/InquiryForm";

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

const StyledSubmitProblem = styled.div`
  display: flex;
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

export class SubmitProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      ethValue: "",
      titleValue: "",
      contentsValue: "",
      loadValue: [],
      accounts: props.accounts,
      contract: props.contract
    };
  }
  onDrop = files => {
    const reader = new FileReader();
    files.forEach(file => {
      reader.readAsText(file);
      var that = this;
      reader.addEventListener("load", function() {
        const Csv = reader.result.replace(/\r?\n/g, ',').split(',')
        const header = Csv.slice(0, 12)
        that.setState({
          header,
          loadValue: Csv.slice(12)
        });
      });
    });
  };
  handleInput(e) {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        this.setState({ titleValue: value });
        break;
      case "email":
        this.setState({ ethValue: value });
        break;
      case "contents":
        this.setState({ contentsValue: value });
        break;
      case "name":
        this.setState({ nameValue: value });
        break;
    }
  }
  handleSubmit() {
    console.log("submit");
    const {
      nameValue,
      ethValue,
      titleValue,
      contentsValue,
      loadValue,
      header
    } = this.state;
    let ts = new Date().getTime();
    let ts2 = Math.floor(ts / 1000);
    let option = {
      from: this.state.accounts[0],
      gasPrice: "20000000000", // このトランザクションで支払う1ガス当たりの価格。単位は wei。
      gas: "4000000",
      value: ethValue,
      nonce: ts2 // ガスリミット。このトランザクションで消費するガスの最大量。
    };
    let args = [header, loadValue, titleValue, contentsValue];
    this.state.contract.methods
      .defineTheme(
        header,
        loadValue,
        [`${titleValue}`],
        contentsValue
      )
      .send(option);
  }
  render() {
    const { nameValue, ethValue, titleValue, contentsValue } = this.state;
    return (
      <StyledSubmitProblem>
        <InquiryForm
          handleInput={this.handleInput.bind(this)}
          nameValue={nameValue}
          ethValue={ethValue}
          titleValue={titleValue}
          contentsValue={contentsValue}
        />
        <FileDropZone onDrop={this.onDrop.bind(this)}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <DropZoneContainer
              isDragActive={isDragActive}
              {...getRootProps()}
              className={classNames("dropzone", {
                "dropzone--isActive": isDragActive
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <Div>
                  <Image src="../static/up.png" />
                  <Text>Select or Drop your file here</Text>
                </Div>
              )}
            </DropZoneContainer>
          )}
        </FileDropZone>
        <Button handleClick={this.handleSubmit.bind(this)} text="SUBMIT" />
      </StyledSubmitProblem>
    );
  }
}
