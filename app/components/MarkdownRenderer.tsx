"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });

type MarkdownRendererProps = {
  content: string;
};
const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <DynamicQuill
      readOnly
      theme="bubble"
      className="min-h-96 p-0 renderer"
      value={content}
    />
  );
};

export default MarkdownRenderer;
