export function parseAsArticle(data: FormData) {
  const errors = [];

  const title = data.get("title");
  if (typeof title !== "string" || title === "") {
    errors.push("Give this article a title");
  }

  const description = data.get("description");
  if (typeof description !== "string" || description === "") {
    errors.push("Describe what this article is about");
  }

  const body = data.get("body");
  if (typeof body !== "string" || body === "") {
    errors.push("Write the article itself");
  }

  const tags = data.get("tags");
  if (typeof tags !== "string") {
    errors.push("The tags must be a string");
  }

  if (errors.length > 0) {
    throw errors;
  }

  return { title, description, body, tags: data.get("tags") ?? "" } as {
    title: string;
    description: string;
    body: string;
    tags: string;
  };
}
