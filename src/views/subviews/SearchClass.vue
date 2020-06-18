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
    <el-table :data="classlist" border stripe class="margintop50" @row-click="handleDetailClass">
      <el-table-column prop="id" label="课程代码"></el-table-column>
      <el-table-column prop="classname" label="课程名"></el-table-column>
      <el-table-column prop="teacher" label="授课教师"></el-table-column>
      <el-table-column prop="storage" label="课程容量"></el-table-column>
      <el-table-column prop="selected" label="已选人数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='unselected'"
            @click="handleChooseClass(scope.row)"
            type="text"
            size="small"
          >选课</el-button>
          <el-button v-if="scope.row.status==='selected'" type="text" size="small" disabled>已选</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="margintop50 marginbottom100 aliginright"
      background
      layout="prev, pager, next"
      :page-size="pagination.limit"
      :total="classNumber"
      @current-change="handlePageIndexChange"
    ></el-pagination>
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
      ]
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
    async submitSearch() {
      await this.$store.dispatch("pullClasslist");
    },
    async handleChooseClass(row) {
      const uid = this.$store.state.user.currrentUser.uid;
      await this.$axios.post("class/choose", {
        id: row.id,
        uid
      });
      await this.$store.dispatch("pullSelectedClasslist");
    },
    async handlePageIndexChange(index) {
      // console.log(index);
      await this.$store.commit("classlistPaginationStatus", { index });
      await this.$store.dispatch("pullClasslist");
    }
  },
  computed: {
    classlist() {
      return this.$store.getters.processedClasslist;
    },
    classNumber() {
      return this.$store.state.classNumber;
    },
    pagination() {
      return this.$store.state.classlistPagination;
    }
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
.aliginright {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>