"use client";
import "react-quill/dist/quill.snow.css";

type MarkdownRendererProps = {
  content: string;
};
const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="ql-editor !p-0 mt-6" dangerouslySetInnerHTML={{ __html: content }} />
    // <DynamicQuill
    //   readOnly
    //   theme="bubble"
    //   className="min-h-96 p-0 renderer"
    //   value={content}
    // />
  );
};

export default MarkdownRenderer;
