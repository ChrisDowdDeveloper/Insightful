import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface UploadFileComponentProps {
  showUpload: boolean;
  setShowUpload: (value: boolean) => void;
}

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({
  showUpload,
  setShowUpload,
}) => {
  if (!showUpload) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="relative w-96 h-48 bg-white border-2 border-dashed rounded flex flex-col items-center justify-center"
        onDragOver={() => {}}
        onDrop={() => {}}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowUpload(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Drag and Drop Content */}
        <p className="text-gray-500 mb-2">Drag and drop your file here</p>
        <p className="text-gray-400">or</p>
        <label
          htmlFor="file-upload"
          className="text-customBlue underline cursor-pointer mt-2"
        >
          Browse files
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default UploadFileComponent;
