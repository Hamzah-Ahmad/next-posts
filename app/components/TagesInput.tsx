import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { TAGS_LIST } from "@/constants";

export default function TagsFilter({
  selectedTags = [],
  setSelectedTags,
}: any) {
  return (
    <Listbox
      value={selectedTags}
      onChange={setSelectedTags}
      multiple
      as={"div"}
      className="relative"
    >
      <Listbox.Button
        className="text-white p-2 rounded-md w-full flex
             items-center gap-x-2 border-base-light border-2 h-12"
      >
        {selectedTags.length > 0 ? (
          selectedTags.map((tag: string) => (
            <span className="text-white rounded-md p-1 px-2  bg-base-100">
              {tag}
            </span>
          ))
        ) : (
          <span className="text-base-light">Add Tags (optional)</span>
        )}
      </Listbox.Button>
      <Listbox.Options className="border-2 pb-4 max-h-52 overflow-auto absolute w-full bg-white z-[999]">
        <div className="flex w-full justify-end pr-4 mt-1">
          <button
            className="text-xs underline"
            onClick={() => setSelectedTags([])}
          >
            Clear All
          </button>
        </div>
        {TAGS_LIST.map((tag) => (
          <Listbox.Option
            key={tag}
            value={tag}
            className={classNames(
              "py-2 pl-3 cursor-pointer hover:bg-base-light",
              selectedTags?.includes(tag) && "bg-base-light"
            )}
          >
            {capitalizeFirstLetter(tag)}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
