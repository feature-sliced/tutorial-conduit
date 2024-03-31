import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";
import { Tabs } from "./Tabs";
import { PopularTags } from "./PopularTags";
import { Pagination } from "./Pagination";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs />

            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Pagination />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
