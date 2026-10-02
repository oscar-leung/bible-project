// data/community.js — window.COMMUNITY: public discussion settings.
// Each chapter's "Discussion" tab can host a shared comment thread via giscus
// (https://giscus.app), which stores comments as GitHub Discussions in a public
// repository: readers sign in with GitHub to post and react; no server needed.
//
// To turn it on (owner, once):
//   1. In the public repo's Settings → General → Features, tick "Discussions".
//   2. Install the giscus GitHub App on that repo: https://github.com/apps/giscus
//   3. Get the ids from https://giscus.app (pick the repo and the "Announcements"
//      category, so only the maintainer and giscus can open new threads) and
//      paste them below. Set giscus: null to turn comments off.
window.COMMUNITY = {
  // One thread per chapter, titled by its key (e.g. "kings1-18"), created by
  // giscus on the first comment in the Announcements category.
  giscus: {
    repo: "oscar-leung/bible-project",
    repoId: "R_kgDOUS6E4A",
    category: "Announcements",
    categoryId: "DIC_kwDOUS6E4M4DG6SB"
  }
};
