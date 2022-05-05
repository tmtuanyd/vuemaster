import PageHome from "@/pages/Home";
import PageThreadShow from "@/pages/ThreadShow";
import NotFound from "@/pages/NotFound";
import Forum from "@/pages/Forum";
import Category from "@/pages/Category";
import { createRouter, createWebHistory } from "vue-router";
import sourceData from "@/data.json";
import Profile from "@/pages/Profile";

const routes = [
  { path: "/", name: "Home", component: PageHome },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { edit: true },
  },
  { path: "/forum/:id", name: "Forum", component: Forum, props: true },
  { path: "/category/:id", name: "Category", component: Category, props: true },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: PageThreadShow,
    props: true,
    beforeEnter: (to, from, next) => {
      //check if thread exists
      const threadExists = sourceData.threads.find(
        (thead) => thead.id === to.params.id
      );
      if (threadExists) {
        return next();
      }
      next({
        name: "NotFound",
        // preserve current path and remove the first char to avoid the target URL starting with `//`
        params: { pathMatch: to.path.substring(1).split("/") },
        query: to.query,
        hash: to.hash,
      });
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) {
      scroll.top = 0;
    }
    if (to.meta.smoothScroll) {
      scroll.behavior = "smooth";
    }
    return scroll;
  },
});
