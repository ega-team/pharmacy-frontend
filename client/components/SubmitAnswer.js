import React from "react";
import classNames from "classnames";
import ReactDropzone from "react-dropzone";
import styled, { css } from "styled-components";
import Encoding from "encoding-japanese";
import Button from "./atoms/Button";

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

export class SubmitAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: props.dataId,
      dataArray: []
    };
  }
  onDrop = files => {
    const reader = new FileReader();
    files.forEach(file => {
      reader.readAsText(file);
      var that = this;
      reader.addEventListener("load", function() {
        that.setState({
          dataArray: reader.result
        });
      });
    });
  };
  handleSubmit() {
    console.log("submit");
    const { dataArray, dataId } = this.state;
    console.log('ここで問題を送信:dataArray, dataId', dataArray, dataId);
  }
  render() {
    return (
      <div className="app">
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
