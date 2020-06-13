<template>
  <el-dialog title="课程简介" :visible.sync="dialogVisible" width="50%" :show-close="false">
    <el-form ref="form" label-width="80px" size="medium">
      <el-form-item label="课程名" prop="name">{{classData.name}}</el-form-item>
      <el-form-item label="课程简介" prop="introduction">
        <el-input type="textarea" :rows="3" v-model="classData.introduction"></el-input>
      </el-form-item>
      <el-form-item label="授课教师" prop="teacher">{{classData.teacher}}</el-form-item>
      <el-form-item label="学分" prop="cent">{{classData.cent}}</el-form-item>
      <el-form-item label="课程要求" prop="want">
        <el-input type="textarea" :rows="5" v-model="classData.want"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    classData: {
      type: Object,
      default: () => {
        return {
          name: "线性代数",
          introduction: "hello, this is difficult!",
          teacher: "王小明",
          cent: 2.5,
          want: "focus on me please, or you will die"
        };
      }
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>