<template>
  <div class="classlist">
    <Header subtitle="选课"></Header>
    <div class="mainbox">
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="progressBar">
            <Progress :step="step" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="tabControl">
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
              <el-tab-pane label="查询课程" name="search">
                <SearchClass />
              </el-tab-pane>
              <el-tab-pane label="已选课程" name="selected">
                <SelectedClass />
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Progress from "@/components/Progress.vue";
import SearchClass from "./subviews/SearchClass";
import SelectedClass from "./subviews/SelectedClass";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    Progress,
    SearchClass,
    SelectedClass
  },
  data() {
    return {
      step: 0,
      activeTab: "search"
    };
  },
  methods: {
    ...mapActions([
      "pullClasslist",
      "pullSelectedClasslist",
      "pullClassNumber"
    ]),
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    // async getInfo() {
    //   await this.$axios.get("class/step").then(res => {
    //     if (res.data.code === 200) {
    //       this.step = res.data.step;
    //     }
    //   });
    // }
    getInfo() {
      this.step = 1;
    }
  },
  created() {
    this.getInfo();
    // this.pullClassNumber();
    // this.pullClasslist();
    this.pullSelectedClasslist();
  }
};
</script>

<style>
.mainbox {
  margin-top: 50px;
}
.tabControl {
  margin-top: 50px;
}
</style>