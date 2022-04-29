<template>
  <header class="header">
    <router-link :to="{name: 'Home'}" class="logo">
      <img src="../assets/svg/icon-12month.svg" alt="">
    </router-link>

    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>

      <nav></nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheNavbar"
}
</script>

<style scoped>

</style>
