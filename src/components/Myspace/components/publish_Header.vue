<template>
  <div class="test">
    <div class="progress1">
      <img src="../../../assets/logo/default.png"  style="width: 150px; height: 150px"  class="logo">
      <div class="logo2">我的购物车</div>
      <div class="progress2">
        <el-steps :active="0">
          <el-step title="购物车" icon="el-icon-shopping-cart-2" style=""></el-step>
          <el-step title="支付" icon="el-icon-s-finance"></el-step>
          <el-step title="完成" icon="el-icon-check"></el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publish_Header",
  data() {
    return {
      url :'https://img0.baidu.com/it/u=3646265661,4012551801&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    }
  }
}
</script>

<style scoped>
.test {
  width: 90%;
  margin-left: 50px;

}
.progress1 {
  display: inline-block;
  margin-top: 20px;
  width: 100%;
}
.progress2 {
  display: inline-block;
  width: 500px;
  float: right;
  margin-top: 57px;
}
.logo {
  float: left;
}
.logo2 {
  margin-top: 60px;
  float: left;
  margin-left: 30px;
  font-size: 25px;
}
</style>