<template>
  <div class="task-wrap">
    <topBar></topBar>
    <div class="inner">
      <div class="task-list">
        <ul>
          <li>
            <a href="javascript:void(0);">
              <p>邀请好友关注</p>
              <span>奖励100积分，最多可获得3000积分</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <p>邀请好友关注</p>
              <span>奖励100积分，最多可获得3000积分</span>
            </a>
            <span class="havepart">已参与</span>
          </li>
          <li>
            <a href="javascript:void(0);">
              <p>邀请好友关注</p>
              <span>奖励100积分，最多可获得3000积分最多可获得3000积分</span>
            </a>
            <span class="havepart">已参与</span>
          </li>
          <li>
            <a href="javascript:void(0);">
              <p>邀请好友关注邀请好友关注邀请好友关注</p>
              <span>奖励100积分，最多可获得3000积分</span>
            </a>
            <span class="havepart">已参与</span>
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
<style scoped src="./task.less" lang="less"></style>
