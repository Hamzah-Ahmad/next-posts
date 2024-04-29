"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const DynamicQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-100 rounded-xl" />,
});

type EditorProps = {
  handleChange?: (str: string) => void;
  defaultValue?: string;
};
export const Editor = ({ handleChange, defaultValue = "" }: EditorProps) => {
  return (
    <DynamicQuill
      onChange={handleChange}
      theme="snow"
      defaultValue={defaultValue}
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
          ["link"],
          ["clean"],
        ],
      }}
    />
  );
};
