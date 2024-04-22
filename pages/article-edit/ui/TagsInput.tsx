import { useEffect, useRef, useState } from "react";

export function TagsInput({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: Array<string>;
}) {
  const [tagListState, setTagListState] = useState(defaultValue ?? []);

  function removeTag(tag: string): void {
    const newTagList = tagListState.filter((t) => t !== tag);
    setTagListState(newTagList);
  }

  const tagsInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    tagsInput.current && (tagsInput.current.value = tagListState.join(","));
  }, [tagListState]);

  return (
    <>
      <input
        type="text"
        className="form-control"
        id="tags"
        name={name}
        placeholder="Enter tags"
        defaultValue={tagListState.join(",")}
        onChange={(e) =>
          setTagListState(e.target.value.split(",").filter(Boolean))
        }
      />
      <div className="tag-list">
        {tagListState.map((tag) => (
          <span className="tag-default tag-pill" key={tag}>
            <i
              className="ion-close-round"
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                [" ", "Enter"].includes(e.key) && removeTag(tag)
              }
              onClick={() => removeTag(tag)}
            ></i>{" "}
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
