import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, getUserFromSession } from "shared/api";

async function throwAnyErrors<T>(responsePromise: Promise<FetchResponse<T>>) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: (response as Response).status });
  }

  return data;
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);
  const userSession = await getUserFromSession(request);

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET(
          url.searchParams.get("source") === "my-feed"
            ? "/articles/feed"
            : "/articles",
          {
            params: {
              query: {
                tag: selectedTag,
                limit: LIMIT,
                offset: !Number.isNaN(page) ? page * LIMIT : undefined,
              },
            },
            headers:
              userSession !== null
                ? {
                    Authorization: `Token ${userSession.token}`,
                  }
                : {},
          },
        ),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
