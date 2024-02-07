// TODO singleton ??
// let fetch1: any;
// if (!fetch1) {
//   await import("node-fetch").then((nodeFetch) => {
//     fetch1 = nodeFetch;
//   });
// }


namespace SingleResponsibilityChallenge {
  const getPosts = async (userId: number) => {
    try {
      const response = await fetch1(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const posts = await response.json() as { userId: string | undefined }[];
      // Do some cleanup; remove UserID from post since it's not really needed
      const cleanedPosts = posts.map((post) => {
        delete post["userId"];
        return post;
      });
      return cleanedPosts;
    } catch (e) {
      // Log error in some kind of Error Logging Service, here we just do console log
      console.log(e);
      // Send a meaningful but non-technical error message back to the end-user
      throw Error("Error while fetching Posts!");
    }
  };

  const main = async () => {
    const result = await getPosts(1);
    console.log(result);
  };

  // main();
}

// ### Where this fails

// This approach works but has a few issues that become pretty substantial when working with larger codebases.

// 1. The function handles too many things — fetching data, error handling, and even cleaning up posts.
// 2. It is difficult to re-use — again the tight coupling is an issue.

namespace SingleResponsibilitySolution {
  const fetchPosts = async (userId: number) => {
    try {
      const response = await fetch1(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const posts = await response.json() as { userId: string | undefined }[];
      if (!posts) throw Error("No posts found!");
      return posts;
    } catch (e) {
      handleError(e)
    }
  };

  const sanitizePosts = (posts: { userId: string | undefined }[]) => {
    const cleanedPosts = posts.map((post) => {
      delete post["userId"];
      return post;
    });
    return cleanedPosts;
  };

  const handleError = (e: unknown) => {
    // Log error in some kind of Error Logging Service, here we just do console log
    console.error(e);
    // Send a meaningful but non-technical error message back to the end-user
    throw Error("Error while fetching Posts!");
  }

  const main = async () => {
    const posts = await fetchPosts(1) as { userId: string | undefined }[];
    const sanitizedPosts = sanitizePosts(posts);
    console.log(sanitizedPosts);
  };

  main();
}