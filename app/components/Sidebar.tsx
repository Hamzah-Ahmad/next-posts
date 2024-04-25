"use client";
import React, { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TagsFilter from "./TagsFilter";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.search) return;

    params.set("search", data.search as string);

    replace(`${pathname}?${params.toString()}`);
  }

  function clearSearchParm() {
    params.delete("search");

    replace(`${pathname}?${params.toString()}`);

    if (inputRef?.current?.value) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className=" pt-0">
      <form
        onSubmit={handleSearch}
        className="flex relative items-center  mb-4"
      >
        <input
          ref={inputRef}
          name="search"
          placeholder="Search by title"
          className="border-2 border-base-light rounded-md p-1 pl-2 w-full md:w-auto pr-14"
          defaultValue={params.get("search") || ""}
        />
        <button className="absolute right-4">
          <MagnifyingGlassIcon className="w-4" />
        </button>
       {params.get("search") && <button
          type="button"
          onClick={clearSearchParm}
          className="absolute right-9"
        >
          <XMarkIcon className="w-4" />
        </button>}
      </form>

      <TagsFilter />
    </div>
  );
};

export default Sidebar;
