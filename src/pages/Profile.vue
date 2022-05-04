<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <div class="profile-card">
          <p class="text-center">
            <img :alt="`${user.name} profile picture`" :src="user.avatar" class="avatar-xlarge">
          </p>
          <h1 class="title">{{ user.username }}</h1>
          <p class="text-lead">{{ user.name }}</p>
          <p class="text-justify">{{ user.bio || "no bio specified" }}</p>
          <span class="online">{{ user.username }} is online</span>
          <div class="stats">
            <span>{{ userPostsCount }} post</span>
            <span>{{ userThreadsCount }} threads</span>
          </div>
          <hr>
          <p v-if="user.website" class="text-large text-center">
            <i class="fa fa-globe">
              <a :href="user.website">{{ user.website }}</a>
            </i>
          </p>
        </div>
        <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
            <span class="text-lead">
              {{ user.username }}'s recent activity
            </span>
          <a href="#">See only started threads?</a>
        </div>
        <hr>
        <PostList :posts="userPosts"/>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  components: {PostList},
  computed: {
    ...mapGetters({user: 'authUser'}),
    userPosts() {
      return this.$store.state.posts.filter(post => post.userId === this.user.id)
    },
    userPostsCount() {
      return this.userPosts.length
    },
    userThreads() {
      return this.$store.state.threads.filter(thread => thread.userId === this.user.id)
    },
    userThreadsCount() {
      return this.userThreads.length
    }
  }
}
</script>

<style scoped>

</style>
