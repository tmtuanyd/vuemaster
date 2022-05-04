<template>
  <header class="header">
    <router-link :to="{name: 'Home'}" class="logo">
      <img alt="" src="../assets/svg/icon-12month.svg">
    </router-link>

    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <nav class="navbar">
      <ul>
        <li class="navbar-user">
          <router-link :to="{name: 'Profile'}">
            <img :alt="`${authUser.name} profile picture`" :src="authUser.avatar" class="avatar-small"/>
            <span>
                {{ authUser.name }}
                <img alt="" class="icon-profile" src="../assets/svg/icon-guarantee.svg">
              </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "TheNavbar",
  computed: {
    ...mapGetters(['authUser'])
  }
}
</script>

<style scoped>

</style>
