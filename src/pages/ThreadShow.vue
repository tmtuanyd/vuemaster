<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}
      <router-link :to="{name: 'ThreadEdit', id: this.id}" class="btn-small btn-green">
        Edit Thread
      </router-link>
    </h1>

    <p>
      By <a class="link-unstyled" href="#">{{ thread.author.name }}</a>,
      <app-date :timestamp="thread.publishedAt"/>
      .
      <span
        class="hide-mobile text-faded text-small"
        style="margin-top: 2px;"
      >{{ thread.repliesCount }} replies by {{ thread.contributorsCount }} contributors</span
      >
    </p>

    <post-list :posts="threadPosts"/>

    <post-editor @save="addPost"/>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate";

export default {
  name: "ThreadShow",
  components: {
    AppDate,
    PostList,
    PostEditor,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      newPostText: "",
    };
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    posts() {
      return this.$store.state.posts
    },
    thread() {
      return this.$store.getters.thread(this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.$store.dispatch("createPost", post)
      this.newPostText = "";
    },
  },
};
</script>

<style></style>
