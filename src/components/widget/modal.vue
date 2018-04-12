<template>
  <div class="modal-wrap" v-show="false">
    <div class="inner inner-info">
      <h5>提醒</h5>
      <p class="info">此次补签将消耗您<span>20积分</span></p>
      <p class="mess">我是文字</p>
      <div class="btn-wrap">
        <div class="btn-cancel">取消</div>
        <div class="btn-sure">确定</div>
      </div>
    </div>
    <div class="inner inner-edit">
      <p class="info">编辑邮箱</p>
      <div class="form-box">
        <input type="text" placeholder="邮箱"/>
      </div>
      <div class="btn-wrap">
        <div class="btn-cancel">删除详细地址</div>
        <div class="btn-sure">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    data() {
      return {}
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./modal.less" lang="less"></style>
