"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
    handlePageChange(page + 1);
  }

  function moveToPrevPage() {
    handlePageChange(page - 1);
  }

  return (
    <div className="mt-32 flex justify-center gap-x-4 items-center">
      <button onClick={moveToPrevPage} className="disabled:opacity-30" disabled={page <= 1}>
        <ChevronLeftIcon className="h-6" />
      </button>

      <div>{page}</div>
      <button onClick={moveToNextPage} className="disabled:opacity-30" disabled={count <= page * limit}>
        <ChevronRightIcon className="h-6" />
      </button>
    </div>
  );
};

export default Pagination;
