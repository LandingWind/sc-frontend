<template>
  <div class="progress">
    <el-steps :active="step" finish-status="success">
      <el-step title="未开始"></el-step>
      <el-step title="第一轮选课中"></el-step>
      <el-step title="第一轮选课结束"></el-step>
      <el-step title="第二轮选课中"></el-step>
      <el-step title="第二轮选课结束"></el-step>
      <el-step title="选课完成"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style>
</style>