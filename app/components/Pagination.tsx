"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  count,
  limit,
  page,
}: {
  count: number;
  limit: number;
  page: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageChange(pageNum: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());

    replace(`${pathname}?${params.toString()}`);
  }

  function moveToNextPage() {
    handlePageChange(page + 1)
  }
  
  function moveToPrevPage() {
    handlePageChange(page - 1)
  }

  return (
    <div className="mt-32 w-full flex justify-between">
      {page > 1 ? (
        <button onClick={moveToPrevPage}>Prev</button>
      ) : (
        <div />
      )}
      <div>Test</div>
      {count > page * limit ? <button onClick={moveToNextPage}>Next</button> : <div />}
    </div>
  );
};

export default Pagination;
