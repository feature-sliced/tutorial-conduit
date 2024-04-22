import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";

import { GET, getUserFromSession } from "shared/api";

async function throwAnyErrors<T>(responsePromise: Promise<FetchResponse<T>>) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: (response as Response).status });
  }

  return data;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const currentUser = await getUserFromSession(request);

  if (!params.slug) {
    return { article: null };
  }

  return throwAnyErrors(
    GET("/articles/{slug}", {
      params: { path: { slug: params.slug } },
      headers: { Authorization: `Token ${currentUser?.token}` },
    }),
  );
};
