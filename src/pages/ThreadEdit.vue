<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>
    <thread-editor :text="text" :title="thread.title" @cancel="cancel" @save="save"/>
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";

export default {
  name: "ThreadEdit",
  components: {ThreadEditor},
  props: {
    id: {type: String, required: true}
  },
  computed: {
    thread() {
      return this.$store.state.threads.find(thread => thread.id === this.id)
    },
    text() {
      return this.$store.state.posts.find(post => post.id === this.thread.posts[0])?.text
    }
  },
  methods: {
    async save({title, text}) {
      const thread = await this.$store.dispatch('updateThread', {
        id: this.id,
        text,
        title
      })
      this.$router.push({name: 'ThreadShow', params: {id: thread.id}})
    },
    cancel() {
      this.$router.push({name: 'ThreadShow', params: {id: this.id}})
    }
  }
}
</script>

<style scoped>

</style>
