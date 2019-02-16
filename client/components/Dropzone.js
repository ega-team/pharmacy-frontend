import React from 'react';
import ReactDropzone from 'react-dropzone';
import styled from 'styled-components'

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
`

export class SubmitDropzone extends React.Component {
  onDrop = files => {
    files.forEach (file => {
        console.log(file)
    });
  };
  render () {
    return (
      <div className="app">
        <FileDropZone onDrop={this.onDrop.bind(this)}>
          {({getRootProps}) => (
            <div {...getRootProps()}>
              <p>Drop files here, or click to select files</p>
            </div>
          )}
        </FileDropZone>
      </div>
    );
  }
}
