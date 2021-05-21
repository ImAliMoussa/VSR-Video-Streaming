import React, { Component } from 'react';
import axios from 'axios';

class UploadPage extends Component {
  state = {
    // Initially, no file is selected
    videoFile: null,
    thumbnailFile: null
  };

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    console.log({ target: event.target });
    const { name } = event.target;
    this.setState({ [name]: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "videoFile",
      this.state.videoFile,
      this.state.videoFile.name
    );
    formData.append(
      "thumbnailFile",
      this.state.thumbnailFile,
      this.state.thumbnailFile.name
    );

    formData.append(
      "title",
      "my title"
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("http://localhost:8000/upload/", formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>File Type: {this.state.selectedFile.type}</p>


          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div>
        <h1>
          GeeksforGeeks
            </h1>
        <h3>
          File Upload using React!
            </h3>
        <div>
          <div>
            Enter Video:
          </div>
          <input type="file" onChange={this.onFileChange} name='videoFile' />
          <div>
            Enter Thumbnail:
          </div>
          <input type="file" onChange={this.onFileChange} name='thumbnailFile' />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default UploadPage;
