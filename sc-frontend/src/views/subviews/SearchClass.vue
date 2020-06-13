<template>
  <div class="search-class">
    <ClassBrief ref="classbrief" />
    <el-form ref="form" :inline="false" label-width="80px" size="small" class="conditionForm">
      <el-form-item label="课程名" prop="classname">
        <el-input v-model="conditions.classname"></el-input>
      </el-form-item>
      <el-form-item label="课程代码" prop="classcode">
        <el-input v-model="conditions.classcode"></el-input>
      </el-form-item>
      <el-form-item label="教师" prop="teacher">
        <el-input v-model="conditions.teacher"></el-input>
      </el-form-item>
      <el-form-item label="授课时间" prop="time">
        <el-cascader
          v-model="conditions.times"
          :options="timesOptions"
          :props="{ multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitSearch">搜索课程</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
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
          <el-button @click="handleChooseClass(scope.row)" type="text" size="small">选课</el-button>
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
    const timesOptionsSec = [
      {
        value: "",
        label: "12节"
      },
      {
        value: "",
        label: "345节"
      },
      {
        value: "",
        label: "678节"
      },
      {
        value: "",
        label: "9-10节"
      },
      {
        value: "",
        label: "11-13节"
      }
    ];
    return {
      conditions: {
        classname: "",
        classcode: "",
        teacher: "",
        times: []
      },
      timesOptions: [
        {
          value: "mon",
          label: "星期一",
          children: timesOptionsSec
        },
        {
          value: "tue",
          label: "星期二",
          children: timesOptionsSec
        },
        {
          value: "wed",
          label: "星期三",
          children: timesOptionsSec
        },
        {
          value: "thu",
          label: "星期四",
          children: timesOptionsSec
        },
        {
          value: "fri",
          label: "星期五",
          children: timesOptionsSec
        },
        {
          value: "sat",
          label: "星期六",
          children: timesOptionsSec
        },
        {
          value: "sun",
          label: "星期日",
          children: timesOptionsSec
        }
      ],
      tableData: [],
      selectedClassList: []
    };
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
    async getSelectedClass() {
      const { token, uid } = this.$store.state.user.currentUser;
      await this.$axios
        .post("/class/selected", {
          token,
          uid
        })
        .then(res => {
          if (res.data.code === 200) {
            this.selectedClassList = res.data.classlist;
          }
        });
    },
    async submitSearch() {
      await this.$axios
        .post("/class/list", {
          conditions: this.conditions
        })
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.classlist;
          }
        });
    },
    async handleChooseClass() {}
  },
  created() {
    this.getSelectedClass();
  }
};
</script>

<style>
.search-class {
  margin-top: 30px;
}
.conditionForm {
  width: 400px;
}
.margintop50 {
  margin-top: 50px;
}
.marginbottom100 {
  margin-bottom: 100px;
}
</style>