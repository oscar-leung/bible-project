// data/community.js — window.COMMUNITY: public discussion settings.
// Each chapter's "Discussion" tab can host a shared comment thread via giscus
// (https://giscus.app), which stores comments as GitHub Discussions in a public
// repository: readers sign in with GitHub to post and react; no server needed.
//
// To turn it on (owner, once):
//   1. In the public repo's Settings → General → Features, tick "Discussions".
//   2. Install the giscus GitHub App on that repo: https://github.com/apps/giscus
//   3. Get the ids from https://giscus.app (pick the repo and a category such as
//      "Q&A") and paste them below. Leave giscus: null to keep it off.
window.COMMUNITY = {
  giscus: null
  // giscus: {
  //   repo: "oscar-leung/bible-project",
  //   repoId: "R_...",
  //   category: "Q&A",
  //   categoryId: "DIC_..."
  // }
};
