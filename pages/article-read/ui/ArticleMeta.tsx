import { Form, Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function ArticleMeta() {
  const currentUser = useContext(CurrentUser);
  const { article } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <div className="article-meta">
        <Link
          prefetch="intent"
          to={`/profile/${article.article.author.username}`}
        >
          <img src={article.article.author.image} alt="" />
        </Link>

        <div className="info">
          <Link
            prefetch="intent"
            to={`/profile/${article.article.author.username}`}
            className="author"
          >
            {article.article.author.username}
          </Link>
          <span className="date">{article.article.createdAt}</span>
        </div>

        {article.article.author.username == currentUser?.username ? (
          <>
            <Link
              prefetch="intent"
              to={`/editor/${article.article.slug}`}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            &nbsp;&nbsp;
            <button
              name="_action"
              value="delete"
              className="btn btn-sm btn-outline-danger"
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <input
              name="username"
              value={article.article.author.username}
              type="hidden"
            />
            <button
              name="_action"
              value={
                article.article.author.following
                  ? "unfollowAuthor"
                  : "followAuthor"
              }
              className={`btn btn-sm ${article.article.author.following ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              <i className="ion-plus-round"></i>
              &nbsp;{" "}
              {article.article.author.following
                ? "Unfollow"
                : "Follow"}{" "}
              {article.article.author.username}
            </button>
            &nbsp;&nbsp;
            <button
              name="_action"
              value={article.article.favorited ? "unfavorite" : "favorite"}
              className={`btn btn-sm ${article.article.favorited ? "btn-primary" : "btn-outline-primary"}`}
            >
              <i className="ion-heart"></i>
              &nbsp; {article.article.favorited
                ? "Unfavorite"
                : "Favorite"}{" "}
              Post{" "}
              <span className="counter">
                ({article.article.favoritesCount})
              </span>
            </button>
          </>
        )}
      </div>
    </Form>
  );
}
