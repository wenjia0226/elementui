<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive > 
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
       <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created() {
  //   console.log(this.$route.meta.keepAlive)
  // },
  methods: {

  }
}
</script>

<style>

</style>
