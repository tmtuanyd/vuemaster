<template>
  <h1>{{ category.name }}</h1>

  <ForumList :forums="forums" :categoryName="category.name" />
</template>
<script>
import ForumList from "@/components/ForumList.vue";
import sourceData from "@/data.json";
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
      return sourceData.categories.find((category) => category.id === this.id);
    },
    forums() {
      return sourceData.forums.filter((forum) => forum.categoryId === this.id);
    },
  },
};
</script>
<style></style>
