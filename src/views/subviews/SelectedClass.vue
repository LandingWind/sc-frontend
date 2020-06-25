<template>
  <div class="selected-class">
    <ClassBrief ref="classbrief" />
    <el-table :data="selectedClasslist" stripe class="margintop50 marginbottom100">
      <el-table-column prop="courseId" label="课程代码" width="100"></el-table-column>
      <el-table-column prop="classId" label="教学班id" width="100"></el-table-column>
      <el-table-column prop="courseName" label="课程名" width="200"></el-table-column>
      <el-table-column prop="teacher" label="授课教师"></el-table-column>
      <el-table-column prop="credit" label="学分"></el-table-column>
      <el-table-column prop="timeSlot" label="时间段"></el-table-column>
      <el-table-column prop="classroom" label="教室"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleUnchooseClass(scope.row)" type="text" size="small">退课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ClassBrief from "./ClassBrief";

export default {
  components: {
    ClassBrief
  },
  data() {
    return {};
  },
  methods: {
    async handleUnchooseClass(row) {
      const res = await this.$axios.delete("/classes/drop", {
        data: { classId: row.classId }
      });
      this.$message({
        message: res.data.status
      });
      await this.$store.dispatch("pullSelectedClasslist");
    }
  },
  computed: {
    selectedClasslist() {
      return this.$store.state.selectedClasslist;
    }
  }
};
</script>

<style>
.selected-class {
  margin-top: 30px;
}
.margintop50 {
  margin-top: 50px;
}
.marginbottom100 {
  margin-bottom: 100px;
}
</style>