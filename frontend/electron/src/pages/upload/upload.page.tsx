import React, { useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { assert } from 'console';
import { Redirect } from 'react-router-dom';
import ProgressBar from '../../components/progress-bar/progress-bar.component';
import ErrorBanner from '../../components/error-banner/error-banner.component';
import FileUploadComponent from '../../components/file-upload/file-upload.component';

const UploadPage = () => {
  const [title, setTitle] = useState<string>('');
  // On file select (from the pop up)
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (redirect) {
    return <Redirect to="/" />;
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state
    const { name } = event.target;
    if (event.target.files && event.target.files?.length > 0) {
      const file = event.target.files[0];
      if (name === 'videoFile') setVideoFile(file);
      else if (name === 'thumbnailFile') setThumbnailFile(file);
      else assert(false);
    }
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    if (videoFile && thumbnailFile) {
      // Update the formData object
      formData.append('videoFile', videoFile, videoFile.name);
      formData.append('thumbnailFile', thumbnailFile, thumbnailFile.name);

      formData.append('title', title);

      // Request made to the backend api
      // Send formData object
      const config: AxiosRequestConfig = {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      };

      setUploading(true);

      axios
        .post('http://localhost:8000/upload/', formData, config)
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            setRedirect(true);
          }, 3000);
          return null;
        })
        .catch((e: Error | AxiosError) => {
          setErrorMessage(e.message);
        });
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const makeErrorDisappear = () => {
    setErrorMessage('');
  };

  return (
    <div className="h-screen bg-gray-200 overflow-hidden h-screen flex">
      <div className="bg-white self-center max-w-md rounded-lg mx-auto border-1 border-gray-300">
        <div className="w-full p-5">
          {errorMessage.length ? (
            <ErrorBanner errorMsg={errorMessage} setDisappear={makeErrorDisappear} />
          ) : (
            ''
          )}
          <div className="border-b-2">
            <span className="text-xl font-bold text-gray-600 text-center">
              <h3 className="mb-1">Upload a Video</h3>
            </span>
          </div>
          <div className="pt-5">
            <div className="mb-2">
              <span className="text-md">Title</span>
              <input
                type="text"
                className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                value={title}
                onChange={onTextChange}
              />
            </div>
            <div className="mb-2">
              <span className="text-md">Attachments</span>
              <FileUploadComponent
                componentTitle="Attach thumbnail"
                completed={thumbnailFile !== null}
                name="thumbnailFile"
                onChange={onFileChange}
              />
              <FileUploadComponent
                componentTitle="Attach video"
                name="videoFile"
                completed={videoFile !== null}
                onChange={onFileChange}
              />
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                className="h-12 text-lg w-32 bg-gray-700 rounded text-white hover:bg-gray-600"
                onClick={onFileUpload}
              >
                Upload
              </button>
            </div>
            {uploading && (
              <>
                <div className="mb-2" />
                <ProgressBar
                  uploadProgress={uploadProgress}
                  success={success}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
