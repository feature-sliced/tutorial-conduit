import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export { loader } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
