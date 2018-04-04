<template>
  <div class="invite-wrap">
    <topBar></topBar>
    <div class="inner">
      <div class="user">
        <img src="static/img/head-bg.jpg"/>
        <p>用户名</p>
      </div>
      <div class="mess">
        <p>您的好友 超级小娜娜 邀请您与他一起关注</p>
        <p>
          <a href="javascript:void(0);">互动开发测试</a>
          公众号
        </p>
        <p>
          首次关注将获得<a href="javascript:void(0);">100积分</a>奖励
        </p>
        <img src="static/img/head-bg.jpg"/>
        <p class="info">请长按识别以上二维码关注<br>互动开发测试 公众号</p>
      </div>
    </div>
    <router-link to="./invite">
      <div style="font-size:20px;color:#000">测试</div>
    </router-link>
  </div>
</template>

<script>
  import TopBar from './widget/topbar.vue';
  export default {
    components:{
      TopBar:TopBar
    },
    data() {
      return {

      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./invite.less" lang="less"></style>
