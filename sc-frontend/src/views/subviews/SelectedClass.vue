<template>
  <div class="selected-class">
    <el-table :data="tableData" stripe class="margintop50 marginbottom100">
      <el-table-column prop="id" label="课程代码"></el-table-column>
      <el-table-column prop="classname" label="课程名"></el-table-column>
      <el-table-column prop="teacher" label="授课教师"></el-table-column>
      <el-table-column prop="storage" label="课程容量"></el-table-column>
      <el-table-column prop="selected" label="已选人数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleUnchooseClass(scope.row)" type="text" size="small">退课</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async getSelectedClass() {
      const { token, uid } = this.$store.state.user.currentUser;
      await this.$axios
        .post("/class/selected", {
          token,
          uid
        })
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.classlist;
          }
        });
    },
    async handleUnchooseClass() {}
  },
  created() {
    this.getSelectedClass();
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