"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TagsFilter from "./TagsFilter";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.search) return;

    const params = new URLSearchParams(searchParams);
    params.set("search", data.search as string);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="p-4 pt-0">
      <form onSubmit={handleSearch} className="flex relative items-center  mb-4">
        <input name="search" className="border-2 border-base-light rounded-md p-1 pl-2" />
        <button className="absolute right-4">
          <MagnifyingGlassIcon className="w-4" />
        </button>
      </form>

      <TagsFilter />
    </div>
  );
};

export default Sidebar;
