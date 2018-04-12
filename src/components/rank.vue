<template>
  <div class="rank-wrap">
    <topBar></topBar>
    <div class="inner">
      <div class="info">
        <p class="info-s"><em>您目前的积分</em><span>63,534，</span></p>
        <p class="info-l"><em>位于第</em><span>236</span><em>名</em></p>
      </div>
      <div class="rank-list">
        <h5>积分TOP100</h5>
        <ul>
          <li>
            <p>昵称</p>
            <span>100,900</span>
          </li>
          <li>
            <p>昵称</p>
            <span>100,900</span>
          </li>
          <li>
            <p>昵称</p>
            <span>100,900</span>
          </li>
        </ul>
      </div>
    </div>
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
<style scoped src="./rank.less" lang="less"></style>
