import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { TAGS_LIST } from "@/constants";

export default function TagsFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.map((tag) => tag).join(","));
    } else {
      params.delete("tags");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedTags]);

  return (
    <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
      <Listbox.Button
        className="bg-base-100 text-white p-2 rounded-md w-full flex
            justify-center items-center gap-x-2"
      >
        {/* {selectedPeople.map((person) => person.name).join(", ")} */}
        <span>Tags</span> <FunnelIcon className="h-4" />
      </Listbox.Button>
      <Listbox.Options className="border-2 pb-4 mt-2">
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
              selectedTags.includes(tag) && "bg-base-light"
            )}
          >
            {capitalizeFirstLetter(tag)}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
