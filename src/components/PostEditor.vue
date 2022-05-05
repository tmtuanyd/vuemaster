<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          id=""
          v-model="newPostText"
          class="form-input"
          cols="30"
          name=""
          rows="10"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPostText: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.newPostText,
      };
      this.$emit("save", {post}); //access under eventData.post
      this.newPostText = "";
    },
  },
};
</script>

<style></style>
