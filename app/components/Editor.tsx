"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });

type EditorProps = {
  handleChange?: (str: string) => void;
};
export const Editor = ({ handleChange }: EditorProps) => {
  const [isMoutned, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMoutned) return <div />;

  return (
    <DynamicQuill
      onChange={handleChange}
      theme="snow"
      className="min-h-96"
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  );
};
