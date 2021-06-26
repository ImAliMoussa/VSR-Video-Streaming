import React from 'react';

type ProgressBarProps = {
  readonly uploadProgress: number;
  readonly success: boolean;
};

const ProgressBar = ({ uploadProgress, success }: ProgressBarProps) => {
  const color = success ? 'green' : 'pink';
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${color}-600 bg-${color}-200`}
          >
            {success ? 'Video Uploaded' : 'Task in progress'}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-semibold inline-block text-${color}-600`}
          >
            {uploadProgress}%
          </span>
        </div>
      </div>
      <div
        className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${color}-200`}
      >
        <div
          style={{ width: `${uploadProgress}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
