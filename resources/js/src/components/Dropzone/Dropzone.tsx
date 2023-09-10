import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onDrop: (files: FileState[]) => void;
}

export interface FileState extends File {
  preview: string;
}

const baseStyle = {
  flex: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  flexDirection: "column",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const Dropzone: React.FC<Props> = ({ onDrop }: Props) => {
  const [files, setFiles] = useState<FileState[]>([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop(acceptedFiles, fileRejections, event) {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        );
        console.log(acceptedFiles);
      },
    });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style: { ...style, flexDirection: "column" } })}>
        <input {...getInputProps()} />
        <div>Drag 'n' drop some files here, or click to select files</div>
      </div>

      <aside
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
          flexWrap: "wrap",
        }}
      >
        {thumbs}
      </aside>
    </div>
  );
};

export default Dropzone;
