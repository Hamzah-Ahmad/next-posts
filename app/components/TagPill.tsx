import React from "react";

const TagPill = ({ tag }: { tag: string }) => {
  return (
    <span className="text-xs bg-base-100 text-white px-2 py-1 rounded-md">
      {tag}
    </span>
  );
};

export default TagPill;
