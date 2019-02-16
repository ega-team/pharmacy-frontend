import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import ReactDropzone from "react-dropzone";
import styled, { css } from "styled-components";
import Button from "./atoms/Button";
import InquiryForm from "./organisms/InquiryForm";

const DropZoneContainer = styled.div`
  height: 200px;
  width: 40%;
  border: 2px dashed #2c67d8;
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

export class SubmitProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      emailValue: "",
      titleValue: "",
      contentsValue: ""
    };
  }
  onDrop = files => {
    files.forEach(file => {
      console.log(file);
    });
  };
  handleInput(e) {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        this.setState({ titleValue: value });
        break;
      case "email":
        this.setState({ emailValue: value });
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
  }
  render() {
    const { nameValue, emailValue, titleValue, contentsValue } = this.state;
    return (
      <div className="app">
        <InquiryForm
          handleInput={this.handleInput.bind(this)}
          nameValue={nameValue}
          emailValue={emailValue}
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
                <p>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              )}
            </DropZoneContainer>
          )}
        </FileDropZone>
        <Button handleClick={this.handleSubmit.bind(this)} text="SUBMIT" />
      </div>
    );
  }
}
