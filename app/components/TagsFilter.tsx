import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helpers";

type Tag = {
  id: number;
  name: string;
};
const tags = [
  { id: 1, name: "coding" },
  { id: 2, name: "entertainment" },
  { id: 3, name: "technology" },
  { id: 4, name: "news" },
];

export default function TagsFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.map((tag) => tag.name).join(","));
    } else {
      params.delete("tags");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedTags]);

  return (
    <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
      <Listbox.Button className="bg-base-100 text-white p-2 rounded-md w-full">
        {/* {selectedPeople.map((person) => person.name).join(", ")} */}
        Tags
      </Listbox.Button>
      <Listbox.Options className="border-2 pb-4">
        <div className="flex w-full justify-end pr-4 mt-1">
          <button
            className="text-xs underline"
            onClick={() => setSelectedTags([])}
          >
            Clear All
          </button>
        </div>
        {tags.map((tag) => (
          <Listbox.Option
            key={tag.id}
            value={tag}
            className={classNames(
              "py-2 pl-3 cursor-pointer hover:bg-base-light",
              selectedTags.includes(tag) && "bg-base-light"
            )}
          >
            {capitalizeFirstLetter(tag.name)}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}