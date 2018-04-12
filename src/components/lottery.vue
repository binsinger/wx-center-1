<template>
  <div class="lottery-wrap">
    <topBar></topBar>
    <div class="inner">
      <ul class="nav-list">
        <li class="list-link active">
          <p>全部</p>
        </li>
        <li class="list-link">
          <p>积分</p>
        </li>
        <li class="list-link">
          <p>电子券</p>
        </li>
        <li class="list-link">
          <p>实物</p>
        </li>
        <li class="list-link">
          <p>红包</p>
        </li>
      </ul>
      <div class="lottery-list">
        <div class="lottery-link">
          <div class="lottery-l">
            <p>20积分</p>
            <span>2018-04-10  14:08</span>
          </div>
          <div class="lottery-r">
            <p>抽奖标题</p>
            <span class="aly">已发放</span>
          </div>
        </div>
        <div class="lottery-link">
          <div class="lottery-l">
            <p>20积分</p>
            <span>2018-04-10  14:08</span>
          </div>
          <div class="lottery-r">
            <p>抽奖标题</p>
            <span class="not">未发放</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from './widget/topbar.vue';

  export default {
    components: {
      TopBar: TopBar
    },
    data() {
      return {}
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./lottery.less" lang="less"></style>
