import { Form, useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { TagsInput } from "./TagsInput";
import { FormErrors } from "./FormErrors";

export function ArticleEditPage() {
  const article = useLoaderData<typeof loader>();

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormErrors />

            <Form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="Article Title"
                    defaultValue={article.article?.title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="What's this article about?"
                    defaultValue={article.article?.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    defaultValue={article.article?.body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <TagsInput
                    name="tags"
                    defaultValue={article.article?.tagList ?? []}
                  />
                </fieldset>

                <button className="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
