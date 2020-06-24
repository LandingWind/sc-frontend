<template>
  <el-dialog title="课程简介" :visible.sync="dialogVisible" width="50%" :show-close="false">
    <el-form ref="form" label-width="80px" size="medium">
      <el-form-item label="课程名" prop="courseName">{{data.courseName}}</el-form-item>
      <el-form-item label="学期" prop="semester">{{data.semester}}</el-form-item>
      <el-form-item label="课程简介" prop="intro">
        <el-input type="textarea" :rows="3" v-model="data.intro"></el-input>
      </el-form-item>
      <el-form-item label="授课教师" prop="teacherName">{{data.teacherName}}</el-form-item>
      <el-form-item label="学分" prop="credit">{{data.credit}}</el-form-item>
      <el-form-item label="容量" prop="capacity">{{data.capacity}}</el-form-item>
      <el-form-item label="时间段" prop="timeSlot">{{data.timeSlot}}</el-form-item>
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
          courseName: "线性代数",
          intro: "hello, this is difficult!",
          teacherName: "王明",
          credit: 2.5,
          capacity: 100,
          timeSlot: "周四晚"
        };
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      data: this.classData
    };
  },
  methods: {
    showDialog(row) {
      this.data = Object.assign({}, row);
      console.log("Data", this.data);

      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>