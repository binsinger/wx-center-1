<template>
<div class="topbar-wrap">
  <span class="back" @click="back"></span>
  <p>二级标题页面</p>
  <router-link to="/index">
    <span class="home"></span>
  </router-link>
</div>
</template>

<script>
  export default {
    name: 'topbar',
    data() {
      return {}
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./topbar.less" lang="less"></style>
