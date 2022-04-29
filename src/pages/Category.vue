<template>
  <h1>{{ category.name }}</h1>

  <ForumList :forums="forums" :categoryName="category.name" />
</template>
<script>
import ForumList from "@/components/ForumList.vue";
export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    ForumList,
  },
  computed: {
    category() {
      return this.$store.state.categories.find((category) => category.id === this.id);
    },
    forums() {
      return  this.$store.state.forums.filter((forum) => forum.categoryId === this.id);
    },
  },
};
</script>
<style></style>
