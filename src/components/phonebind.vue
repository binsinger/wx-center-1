<template>
  <div class="phonebind-wrap">
    <topBar></topBar>
    <div class="inner">
      <p class="info">首次绑定手机，您将获得****公众号<span>20积分</span></p>
      <div class="form">
        <div class="group">
          <label>手机号+86</label>
          <input type="number" placeholder=""/>
        </div>
        <div class="group">
          <label>短信验证码</label>
          <input type="number" placeholder=""/>
          <div class="btn-code">获取验证码</div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn-log btn-gray">
          暂不登录
        </div>
        <div class="btn-next btn-orange">
          下一步
        </div>
      </div>
    </div>
    <Modal></Modal>
  </div>
</template>

<script>
  import TopBar from './widget/topbar.vue';
  import Modal from './widget/modal.vue';
  export default {
    components:{
      TopBar:TopBar,
      Modal:Modal
    },
    data() {
      return {

      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./phonebind.less" lang="less"></style>
