export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    timeZone: "CET",
  });
}

export function formatBlogPosts(
  posts,
  {
    filterdOutDrafts = true,
    filterdOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
    filterByCat = "",
    filterByAuthor = "",
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft, category, author } = post.frontmatter;
    // filter out drafts
    if (filterdOutDrafts && draft) return acc;

    // filter future posts
    if (filterdOutFuturePosts && new Date(date) > new Date()) return acc;

    // filter by category
    if (filterByCat !== "" && slugify(category) !== filterByCat) return acc;

    // filter by author
    if (filterByAuthor !== "" && slugify(author) !== filterByAuthor) return acc;

    acc.push(post);
    return acc;
  }, []);

  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }
  // limit number
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  //console.log(filteredPosts[0].url);
  // return list of filtered, sorted and limited posts
  return filteredPosts;
}

const arr = [1, 2, 3];
console.log(arr);
