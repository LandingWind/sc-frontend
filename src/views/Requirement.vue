<template>
  <div class="requirement">
    <el-container>
        <el-header id = "head_area">
            <el-button id = "backward" type="primary" icon="el-icon-arrow-left" v-on:click="Back()"></el-button>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <div class="main-area">
                         <el-row>
                            <el-col :span="24" class="choice_set">
                                <div class="choice">
                                    <el-select v-model="major" clearable placeholder="请选择专业">
                                        <el-option
                                            v-for="item in majors"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                        </el-option>
                                  </el-select>
                                </div>
                                <div class="choice">
                                  <el-select v-model="grade" clearable placeholder="请选择年级">
                                      <el-option
                                          v-for="item in options"
                                          :key="item"
                                          :label="item"
                                          :value="item">
                                      </el-option>
                                  </el-select>
                                </div>
                                <div class="r-choice">
                                  <el-button type="primary" title="搜索" v-on:click="getRequirementList()">搜索</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
              <ul class="infinite-list"  style="overflow:auto">
                <li v-for="(i, index) in reqList" class="infinite-list-item" v-bind:key="index">
                  <span class="font-dis">#培养方案{{i.id}}</span>
                  
                  <el-button class = "r-choice" size = small icon="el-icon-arrow-down" circle v-if="i.showDetail" v-on:click="showHide(index)"></el-button>
                  <el-button class = "r-choice" size = small icon="el-icon-arrow-up" circle v-else v-on:click="showHide(index)"></el-button>
                  <el-button class = "r-choice" size = "small" @click="confirmV(i.id)">选择</el-button>

                  <el-row></el-row>                  
                  <div id='detail0' v-if="i.showDetail">
                    <ul>
                      <li>学分：{{i.score}} </li>
                      <li>公共必修课 学分：{{i.commonScore}}</li>
                      <ul class="infinite-list"  style="overflow:auto">
                        <li v-for="(course, cid) in i.common" class="courseItem" v-bind:key="cid">
                          [{{course.id}}]{{course.name}}-------{{course.score}}学分
                        </li>
                      </ul>
                      <li>专业必修课 学分：{{i.neccessaryScore}}</li>
                      <ul class="infinite-list"  style="overflow:auto">
                        <li v-for="(course, cid) in i.neccessary" class="courseItem" v-bind:key="cid">
                          [{{course.id}}]{{course.name}}-------{{course.score}}学分
                        </li>
                      </ul>
                      <li>专业选修课 学分：{{i.optionalScore}}</li>
                      <ul class="infinite-list"  style="overflow:auto">
                        <li v-for="(course, cid) in i.optional" class="courseItem" v-bind:key="cid">
                          [{{course.id}}]{{course.name}}-------{{course.score}}学分
                        </li>
                      </ul>
                    </ul>
                  </div>
                </li>
              </ul>
            </el-row>
        </el-main>
    </el-container>
    
  </div>
</template>
<script>
export default {
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
  mounted () {
    this.$axios
      .post('major/list', null)
      .then(response => (this.majors = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  },
  methods: {
    load: function(){

    },
    Back:function(){
        this.$router.go('-1')
    },
    /*getMajors: function(){
        return this.$axios.post('major/list', null);
    },*/
    getRequirementList: function(){
        const {major, grade} = this;
        this.$axios.post('requirement/info', {major, grade
        }).then( response => {
          this.reqList = response.data;
          console.table(this.reqList);
          if(this.reqList != null){
            this.reqList = this.reqList.map(value => {
              return {showDetail:false, ...value};
            });
          }
          console.log(response);
          
          console.log("reqList:")
          console.table(this.reqList);
        }
        ).catch(error =>{
          console.log(error)
        });
    },
    confirmV: function(rid) {
      {
        const uid = this.$store.state.user.currentUser.uid;
        const type = "Student";
        this.$alert('培养方案设置成功', '请确认', {
          confirmButtonText: '确定',
          callback: action => {
            this.$axios.post('user/setrequirement', {uid, type, rid});
            this.$message({
              type: 'info',
              message: '确认' + `${ action }`
            });
          }
        });
      }
    },
    showHide: function(index_n){
      this.reqList[index_n].showDetail = !this.reqList[index_n].showDetail
    }
  }
};
</script>
<style scoped>
#head_area{
  background-color: #1b74da;
}

#backward{
  top: 20%
}

.choice{
  float: left;
}

.r-choice{
  float: right;
}

.infinite-list-item{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  margin:auto;
}

.main-area{
    background-color: #e5e9f2;
    direction: ltr;
}

.font-dis{
    color: #1b74da;
    font-weight: bold;
}

#detail0{
    background-color: beige;
}
</style>







