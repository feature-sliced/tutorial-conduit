import { useContext } from "react";
import { Form, useSearchParams } from "@remix-run/react";

import { CurrentUser } from "shared/api";

export function Tabs() {
  const [searchParams] = useSearchParams();
  const currentUser = useContext(CurrentUser);

  return (
    <Form>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {currentUser !== null && (
            <li className="nav-item">
              <button
                name="source"
                value="my-feed"
                className={`nav-link ${searchParams.get("source") === "my-feed" ? "active" : ""}`}
              >
                Your Feed
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              className={`nav-link ${searchParams.has("tag") || searchParams.has("source") ? "" : "active"}`}
            >
              Global Feed
            </button>
          </li>
          {searchParams.has("tag") && (
            <li className="nav-item">
              <span className="nav-link active">
                <i className="ion-pound"></i> {searchParams.get("tag")}
              </span>
            </li>
          )}
        </ul>
      </div>
    </Form>
  );
}
