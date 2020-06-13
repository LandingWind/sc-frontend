<template>
  <el-dialog title="课程简介" :visible.sync="dialogVisible" width="50%">
    <span>这是一段信息</span>
  </el-dialog>
</template>

<script>
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style>
</style>