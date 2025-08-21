import { useEffect, useMemo, useState } from "react";
import Dropzone from "react-dropzone";

import UploadIcon from "@/assets/icons/upload.svg?react";

import classes from "./FileUpload.module.scss";

type FileWithPreview = {
  file: File;
  uuid: string;
  preview: string;
};

interface Props {
  files: File[];
  onUpload: (files: File[]) => void;
  onUpdate: (files: File[]) => void;
}

export default function FileUpload({ files, onUpload, onUpdate }: Props) {
  const localFiles: FileWithPreview[] = useMemo(
    () =>
      files.map((file) => ({
        file,
        uuid: self.crypto.randomUUID(),
        preview: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () =>
      localFiles.forEach((localFile) => URL.revokeObjectURL(localFile.preview));
  }, [localFiles]);

  const handleUnselectFile = (uuid: string) => {
    const filteredListFiles = localFiles.filter(
      (localFile) => localFile.uuid !== uuid
    );

    onUpdate(filteredListFiles.map(({ file }) => file));
  };

  return (
    <>
      <Dropzone
        accept={{
          "image/*": [],
          "video/mp4": [".mp4"],
          "video/mpeg": [".mpeg"],
          "video/webm": [".webm"],
        }}
        onDrop={(acceptedFiles) => onUpload(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section className={classes.fileUpload}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <UploadIcon className={classes.fileUploadIcon} />
              Drag 'n' drop some files here, or click to select files
            </div>
          </section>
        )}
      </Dropzone>

      {localFiles.length > 0 && (
        <aside className={classes.fileUploadPreviewContainer}>
          {localFiles.map((localFile) => (
            <div key={localFile.uuid} className={classes.fileUploadPreview}>
              <img
                src={localFile.preview}
                onLoad={() => {
                  URL.revokeObjectURL(localFile.preview);
                }}
              />

              <button
                onClick={() => handleUnselectFile(localFile.uuid)}
                className={classes.fileUploadPreviewClose}
              >
                ✕
              </button>
            </div>
          ))}
        </aside>
      )}
    </>
  );
}
