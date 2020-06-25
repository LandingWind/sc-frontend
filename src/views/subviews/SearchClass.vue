<template>
  <div class="search-class">
    <ClassBrief ref="classbrief" />
    <el-form ref="form" :inline="false" label-width="80px" size="small" class="conditionForm">
      <el-form-item label="课程代码" prop="courseId">
        <el-input v-model="conditions.courseId"></el-input>
      </el-form-item>
      <el-form-item label="课程名" prop="courseName">
        <el-input v-model="conditions.courseName"></el-input>
      </el-form-item>
      <el-form-item label="教师" prop="teacherName">
        <el-input v-model="conditions.teacherName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="授课时间" prop="time">
        <el-cascader
          v-model="conditions.times"
          :options="timesOptions"
          :props="{ multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" size="small" @click="submitSearch">搜索课程</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="classlist" border stripe class="margintop50 marginbottom100">
      <el-table-column prop="courseId" label="课程代码" width="100"></el-table-column>
      <el-table-column prop="id" label="教学班id" width="100"></el-table-column>
      <el-table-column label="课程名" width="200">
        <template slot-scope="scope">
          <el-button @click="handleDetailClass(scope.row)" type="text">{{scope.row.courseName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="授课教师" width="100"></el-table-column>
      <!-- <el-table-column prop="credit" label="学分"></el-table-column> -->
      <el-table-column prop="timeSlot" label="时间段"></el-table-column>
      <!-- <el-table-column prop="classroom" label="教室"></el-table-column> -->
      <!-- <el-table-column prop="capacity" label="容量"></el-table-column> -->
      <!-- <el-table-column prop="numStudent" label="已选人数"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="!isSelected(scope.row)"
            @click="handleChooseClass(scope.row)"
            type="text"
            size="small"
          >选课</el-button>
          <el-button v-if="isSelected(scope.row)" type="text" size="small" disabled>已选</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="margintop50 marginbottom100 aliginright"
      background
      layout="prev, pager, next"
      :page-size="pagination.limit"
      :total="classNumber"
      @current-change="handlePageIndexChange"
    ></el-pagination>-->
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
    handleDetailClass(row) {
      this.$refs.classbrief.showDialog(row);
    },
    async submitSearch() {
      const { courseId, courseName, teacherName } = this.conditions;
      const cc = {
        courseId: courseId === "" ? undefined : courseId,
        courseName: courseName === "" ? undefined : courseName,
        teacherName: teacherName === "" ? undefined : teacherName
      };
      await this.$store.dispatch("pullClasslist", cc);
    },
    async handleChooseClass(row) {
      const res = await this.$axios.post("/classes/register", {
        classId: row.id
      });
      this.$message({
        message: res.data.status
      });
      await this.$store.dispatch("pullSelectedClasslist");
    },
    isSelected(row) {
      return row.status === "selected";
    }
    // async handlePageIndexChange(index) {
    //   // console.log(index);
    //   await this.$store.commit("classlistPaginationStatus", { index });
    //   await this.$store.dispatch("pullClasslist");
    // }
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