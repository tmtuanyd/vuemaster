import { createStore } from "vuex";
import sourceData from "@/data.json";
import { findById } from "@/helpers";

const makeAppendChildToParentMutation =
  ({ parent, child }) =>
  (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };

export default createStore({
  state: { ...sourceData, authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3" },
  getters: {
    authUser: (state) => {
      const user = findById(state.users, state.authId);
      if (!user) {
        return null;
      }
      return {
        ...user,
        get posts() {
          return state.posts.filter((post) => post.userId === user.id);
        },
        get postsCount() {
          return this.posts.length;
        },
        get threads() {
          return state.threads.filter((thread) => thread.userId === user.id);
        },
        get threadsCount() {
          return this.threads.length;
        },
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors.length;
          },
        };
      };
    },
  },
  actions: {
    createPost(context, post) {
      post.id = "qqqq" + Math.random();
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      context.commit("setPost", { post });
      context.commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
      context.commit("appendContributorToThread", {
        childId: context.state.authId,
        parentId: post.threadId,
      });
    },
    updateUser({ commit }, user) {
      commit("setUser", { user, userId: user.id });
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = "ggqq" + Math.random();
      const publishedAt = Math.floor(Date.now() / 1000);
      const userId = state.authId;
      const thread = { forumId, title, publishedAt, userId, id };
      commit("setThread", { thread });
      commit("appendThreadToUser", { parentId: userId, childId: id });
      commit("appendThreadToForum", { parentId: forumId, childId: id });
      dispatch("createPost", { text, threadId: id });
      return findById(state.threads, id);
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };
      commit("setThread", { thread: newThread });
      commit("setPost", { post: newPost });
      return newThread;
    },
  },
  mutations: {
    setPost(state, { post }) {
      const index = state.posts.findIndex((p) => p.id === post.id);
      if (post.id && index !== -1) {
        state.posts[index] = post;
        return;
      }
      state.posts.push(post);
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId);
      state.users[userIndex] = user;
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads",
    }),
    appendContributorToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "contributors",
    }),
    setThread(state, { thread }) {
      const index = state.threads.findIndex((p) => p.id === thread.id);
      if (thread.id && index !== -1) {
        state.threads[index] = thread;
        return;
      }
      state.threads.push(thread);
    },
  },
});

// function makeAppendChildToParentMutation ({parent, child}){
//   return (state, {childId, parentId}) => {
//     const resource = findById(state[parent], parentId);
//     resource[child] = resource.posts || [];
//     resource[child].push(childId);
//   }}
