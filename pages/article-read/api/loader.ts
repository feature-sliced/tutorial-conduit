import { json, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, getUserFromSession } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Expected a slug parameter");
  const currentUser = await getUserFromSession(request);
  const authorization = currentUser
    ? { Authorization: `Token ${currentUser.token}` }
    : undefined;

  return json(
    await promiseHash({
      article: throwAnyErrors(
        GET("/articles/{slug}", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
      comments: throwAnyErrors(
        GET("/articles/{slug}/comments", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
    }),
  );
};
