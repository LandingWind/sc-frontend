<template>
  <div class="requirement">
    <el-container>
      <!-- <el-header id="head_area">
        <el-button id="backward" type="primary" icon="el-icon-arrow-left" v-on:click="Back()"></el-button>
      </el-header>-->
      <Header subtitle="培养方案" />
      <el-main>
        <el-row id="first_row">
          <el-col  :offset="2" :span="20">            
            <el-row class="main-area">
              <div class="choice">
                <el-select v-model="major" clearable placeholder="请选择专业">
                  <el-option v-for="item in majors" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
              <div class="choice">
                <el-select v-model="grade" clearable placeholder="请选择年级">
                  <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
              <div class="r-choice">
                <el-button type="primary" title="搜索" v-on:click="getRequirementList()">搜索</el-button>
              </div>            
            </el-row>            
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="2" :span="20">
            <ul class="infinite-list" style="overflow:auto">
              <li v-for="(i, index) in reqList" class="infinite-list-item" v-bind:key="index">
                <span class="font-dis">#培养方案{{i.id}}</span>

                <el-button
                  class="r-choice"
                  size="small"
                  icon="el-icon-arrow-up"
                  circle
                  v-if="i.showDetail"
                  v-on:click="showHide(index)"
                ></el-button>
                <el-button
                  class="r-choice"
                  size="small"
                  icon="el-icon-arrow-down"
                  circle
                  v-else
                  v-on:click="showHide(index)"
                ></el-button>
                <el-button type="primary" class="r-choice" size="small" @click="confirmV()">选择</el-button>

                <el-row></el-row>
                <div id="detail0" v-if="i.showDetail">
                  <ul>
                    <li>学分：{{i.score}}</li>
                    <li>公共必修课 学分：{{i.commonScore}}</li>
                    <ul class="infinite-list" style="overflow:auto">
                      <li
                        v-for="(course, cid) in i.common"
                        class="courseItem"
                        v-bind:key="cid"
                      >[{{course.id}}]{{course.name}}-------{{course.score}}学分</li>
                    </ul>
                    <li>专业必修课 学分：{{i.neccessaryScore}}</li>
                    <ul class="infinite-list" style="overflow:auto">
                      <li
                        v-for="(course, cid) in i.neccessary"
                        class="courseItem"
                        v-bind:key="cid"
                      >[{{course.id}}]{{course.name}}-------{{course.score}}学分</li>
                    </ul>
                    <li>专业选修课 学分：{{i.optionalScore}}</li>
                    <ul class="infinite-list" style="overflow:auto">
                      <li
                        v-for="(course, cid) in i.optional"
                        class="courseItem"
                        v-bind:key="cid"
                      >[{{course.id}}]{{course.name}}-------{{course.score}}学分</li>
                    </ul>
                  </ul>
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      username: "",
      major: "",
      majors: [],
      grade: "",
      options: ["2017", "2018", "2019"],
      hasChosen: false,
      reqList: []
    };
  },
  mounted() {
    this.$axios
      .post("major/list", null)
      .then(response => (this.majors = response.data))
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  methods: {
    load: function() {},
    Back: function() {
      this.$router.go("-1");
    },
    /*getMajors: function(){
        return this.$axios.post('major/list', null);
    },*/
    getRequirementList: function() {
      const { major, grade } = this;
      this.$axios
        .post("requirement/info", { major, grade })
        .then(response => {
          this.reqList = response.data;
          console.table(this.reqList);
          if (this.reqList != null) {
            this.reqList = this.reqList.map(value => {
              return { showDetail: false, ...value };
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    confirmV: function() {
      this.$alert("培养方案设置成功", "请确认", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: "确认 " + `${action}`
          });
        }
      });
      
      /*const uid = this.$store.state.user.currentUser.uid;
      const type = "Student";

      this.$alert("培养方案设置成功", "请确认", {
        confirmButtonText: "确定",
        callback: action => {
          this.$axios.post("user/setrequirement", { uid, type, rid });
          this.$message({
            type: "info",
            message: "确认 " + `${action}`
          });
        }
      });*/
    },
    showHide: function(index_n) {
      this.reqList[index_n].showDetail = !this.reqList[index_n].showDetail;
    }
  }
};
</script>
<style scoped>
#head_area {
  background-color: #1b74da;
}

#backward {
  top: 20%;
}

.choice {
  float: left;
}

.r-choice {
  margin-left: 10px;
  float: right;
}

.infinite-list-item {
  padding-left: 5px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  background-color: Transparent;
  border-radius: 4px;
  margin: auto;
}

.main-area {
  display: flex;
  justify-content: left;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.font-dis {
  color: #1b74da;
  font-weight: bold;
}

#detail0 {
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: beige;
}
</style>







