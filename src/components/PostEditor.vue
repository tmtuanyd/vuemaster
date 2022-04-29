<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="newPostText"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
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
        publishedAt: Math.floor(Date.now() / 1000),
        userId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2",
      };
      this.$emit("save", {post}); //access under eventData.post
      this.newPostText = "";
    },
  },
};
</script>

<style></style>
