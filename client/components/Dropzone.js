import React from "react";
import classNames from "classnames";
import ReactDropzone from "react-dropzone";
import styled, { css } from "styled-components";

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

export class SubmitDropzone extends React.Component {
  onDrop = files => {
    files.forEach(file => {
      console.log(file);
    });
  };
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
      </div>
    );
  }
}
