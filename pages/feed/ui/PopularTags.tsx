import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";

export function PopularTags() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <Form>
        <ExistingSearchParams exclude={["tag", "page", "source"]} />
        <div className="tag-list">
          {tags.tags.map((tag) => (
            <button
              key={tag}
              name="tag"
              value={tag}
              className="tag-pill tag-default"
            >
              {tag}
            </button>
          ))}
        </div>
      </Form>
    </div>
  );
}
