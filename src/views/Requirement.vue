<template>
  <div class="requirement">
    <!--<el-container>
      <el-header id="head_area">
        <el-button id="backward" type="primary" icon="el-icon-arrow-left" v-on:click="Back()"></el-button>
      </el-header>
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
    </el-container>-->
    <Header subtitle="培养方案" />
    <div class="main-area">
      <el-row>
        <div class="block"><span>总学分: {{allCredit}}/120</span></div>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="block">
            <span>公共选修课: {{commonCredit}}/30</span>
          </div>
          <div class="block">
            <span>专业必修课: {{neccessaryCredit}}/50</span>
          </div>
          <div class="block">
            <span>专业选修课: {{optionalCredit}}/40</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="tabControl">
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
              <el-tab-pane label="公共选修课" name="common">
                <el-table
                  border stripe
                  :data="tableData1"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                  <el-table-column
                    label="课程"
                    width="400">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">[{{ scope.row.courseId }}]{{ scope.row.courseName }} {{scope.row.credit}}学分</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="类型"
                    width="180">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>名称: {{ scope.row.courseName }}</p>
                        <p>学分: {{ scope.row.credit }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.type }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        v-bind:disabled="scope.row.inR"
                        @click="handleAdd(scope.$index, scope.row)">加入</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        v-bind:disabled="!scope.row.inR"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="专业必修课" name="neccessary">
                <el-table
                  border stripe
                  :data="tableData2"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                  <el-table-column
                    label="课程"
                    width="400">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">[{{ scope.row.courseId }}]{{ scope.row.courseName }} {{scope.row.credit}}学分</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="类型"
                    width="180">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>名称: {{ scope.row.courseName }}</p>
                        <p>学分: {{ scope.row.credit }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.type }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        v-bind:disabled="scope.row.inR"
                        @click="handleAdd(scope.$index, scope.row)">加入</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        v-bind:disabled="!scope.row.inR"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="专业选修课" name="optional">
                <el-table
                  border stripe
                  :data="tableData3"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                  <el-table-column
                    label="课程"
                    width="400">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">[{{ scope.row.courseId }}]{{ scope.row.courseName }} {{scope.row.credit}}学分</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="类型"
                    width="180">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>名称: {{ scope.row.courseName }}</p>
                        <p>学分: {{ scope.row.credit }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.type }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        v-bind:disabled="scope.row.inR"
                        @click="handleAdd(scope.$index, scope.row)">加入</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        v-bind:disabled="!scope.row.inR"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
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

export default {
  components: {
    Header
  },
  data() {
    return {
      activeTab: 'common',
      tableData1: [],
      tableData2: [],
      tableData3: [],
    }
  },
  mounted() {
    this.$axios({
      url: "/program/course",
      method: "get",
      headers: {
        'X-Auth-Token': this.$store.state.user.currentUser.token
      }
    }).then(res => {
      console.log(res)
      var i;
      for(i in res.data.courses){
        if(res.data.courses[i].type === '公选'){
          this.tableData1.push(res.data.courses[i])
        }
        else if(res.data.courses[i].type === '必修'){
          this.tableData2.push(res.data.courses[i])
        }
        else{
          this.tableData3.push(res.data.courses[i])
        }
        
      }
      console.log(this.tableData1)
      this.tableData1 = this.tableData1.map((v)=>{
      var list = v.status.split('，');
      var inR;
      var chosen = false;
      if(list[0] === '不在培养方案中'){
        inR = false
      }
      else{
        inR = true
        if(list[1] === '未选课'){
          chosen = false
        }
        else{
          chosen = true
        }
      }
      return {...v, inR:inR, chosen:chosen}
      })
      this.tableData2 = this.tableData2.map((v)=>{
        var list = v.status.split('，');
        var inR;
        var chosen = false;
        if(list[0] === '不在培养方案中'){
          inR = false
        }
        else{
          inR = true
          if(list[1] === '未选课'){
            chosen = false
          }
          else{
            chosen = true
          }
        }
        return {...v, inR:inR, chosen:chosen}
      })
      this.tableData3 = this.tableData3.map((v)=>{
        var list = v.status.split('，');
        var inR;
        var chosen = false;
        if(list[0] === '不在培养方案中'){
          inR = false
        }
        else{
          inR = true
          if(list[1] === '未选课'){
            chosen = false
          }
          else{
            chosen = true
          }
        }
        return {...v, inR:inR, chosen:chosen}
      })

      //console.log(this.tableData1)
      //console.log(this.tableData2)
      //console.log(this.tableData3)
    }).catch(error=>{
      console.log(error)
    })
  },
  computed: {
    
    commonCredit: function(){
      var num = 0.0
      var i 
      //console.log(this.tableData1)
      for(i in this.tableData1){
        console.log(this.tableData1[i])
        if(this.tableData1[i].inR == true) num += Number(this.tableData1[i].credit)
      }
      return num
    },
    neccessaryCredit: function(){
      var num = 0.0
      var i 
      for(i in this.tableData2){
        if(this.tableData2[i].inR == true) num += Number(this.tableData2[i].credit)
      }
      return num
    },
    optionalCredit: function(){
      var num = 0.0
      var i 
      for(i in this.tableData3){
        if(this.tableData3[i].inR == true) num += Number(this.tableData3[i].credit)
      }
      return num
    },
    allCredit: function(){
      return this.commonCredit + this.neccessaryCredit + this.optionalCredit
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleAdd(index, row) {
      this.$axios({
        url: "program/course",
        method: 'put',
        headers: {
          'X-Auth-Token': this.$store.state.user.currentUser.token
        },
        data:{
          cid: row.courseId
        }
      }).then(res => {
        if(res.data.status != '插入成功！'){
          this.$message.error(`添加失败:${res.data.status}`)
          return
        }
        row.inR = true;
        /*if(row.type === '公选'){
          this.tableData1[index].inR = true
        }
        else if(row.type === '必修'){
          this.tableData2[index].inR = true
        }
        else{
          this.tableData3[index].inR = true
        }*/
        this.$message({
          message: "添加成功",
          type: "success"
        })
      }).catch(error => {
        this.$message.error(error)
      })
    },
    handleDelete(index, row) {
      this.$axios({
        url: "program/course",
        method: 'delete',
        headers: {
          'X-Auth-Token': this.$store.state.user.currentUser.token
        },
        data:{
          cid: row.courseId
        }
      }).then(res => {
        if(res.data.status != 'ok'){
          this.$message.error(`删除失败:${res.data.status}`)
          return
        }
        row.inR = false;
        /*if(row.type === '公选'){
          this.tableData1[index].inR = false
        }
        else if(row.type === '必修'){
          this.tableData2[index].inR = false
        }
        else{
          this.tableData3[index].inR = false
        }*/
        this.$message({
          message: "删除成功",
          type: "success"
        })
      }).catch(error => {
        this.$message.error(error)
      })
    },

    tableRowClassName({row, rowIndex}) {
      
      if(row.inR == true && rowIndex >= 0){
        if(row.chosen == true) return 'success-row'
        else return 'warning-row'
      }
      else return ''
    }
  }
  /*data() {
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
    getMajors: function(){
        return this.$axios.post('major/list', null);
    },
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
    },
    showHide: function(index_n) {
      this.reqList[index_n].showDetail = !this.reqList[index_n].showDetail;
    }
  }*/
};
</script>
<!--
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
</style>-->
<style scope>
.main-area {
  display: flex;
  justify-content: left;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: left;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
  background: #f0f9eb;
}

</style>







