import React from 'react';

type FileUploadComponentProps = {
  readonly componentTitle: string;
  readonly name: string;
  readonly completed: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUploadComponent = ({
  componentTitle,
  name,
  completed,
  onChange,
}: FileUploadComponentProps) => {
  const color = completed ? 'green' : 'currentColor';
  return (
    <div className="flex items-center justify-center bg-grey-lighter my-2">
      <label
        className="w-screen flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm tracking-wide border cursor-pointer"
        htmlFor={componentTitle}
      >
        <input
          type="file"
          className="hidden"
          id={componentTitle}
          name={name}
          onChange={onChange}
        />
        <svg
          className="w-8 h-8"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-gray-600">{componentTitle}</span>
      </label>
    </div>
  );
};

export default FileUploadComponent;
