import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@tabler/icons-react";
import PropTypes from "prop-types";

const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => console.error("File drop rejected:", error),
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        className="p-10 rounded-lg cursor-pointer w-full relative border-2 border-dashed border-gray-300 dark:border-gray-600">
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          aria-label="Upload File"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
            Upload File
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Drag and drop files here, or click to upload
          </p>

          {files.length > 0 ? (
            <div className="mt-6 w-full">
              {files.map((file, idx) => (
                <FileItem key={file.name + idx} file={file} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg shadow-inner">
              <IconUpload size={32} className="text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                No files uploaded yet
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const FileItem = ({ file }) => {
  return (
    <motion.div
      layout
      className="flex items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md mt-4">
      <p className="truncate text-sm text-gray-700 dark:text-gray-300">
        {file.name}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {(file.size / (1024 * 1024)).toFixed(2)} MB
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {new Date(file.lastModified).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

FileItem.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    lastModified: PropTypes.number.isRequired,
  }).isRequired,
};

FileUpload.propTypes = {
  onChange: PropTypes.func,
};

export default FileUpload;
