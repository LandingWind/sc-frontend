<template>
  <div class="selected-class">
    <ClassBrief ref="classbrief" />
    <el-table
      :data="selectedClasslist"
      stripe
      class="margintop50 marginbottom100"
      @row-click="handleDetailClass"
    >
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
import ClassBrief from "./ClassBrief";

export default {
  components: {
    ClassBrief
  },
  data() {
    return {};
  },
  methods: {
    handleDetailClass(row, column, event) {
      console.log(
        "handleDetailClass -> row, column, event",
        row,
        column,
        event
      );
      this.$refs.classbrief.showDialog();
    },
    async handleUnchooseClass(row) {
      const uid = this.$store.state.user.currrentUser.uid;
      await this.$axios.post("class/choose", {
        id: row.id,
        uid
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