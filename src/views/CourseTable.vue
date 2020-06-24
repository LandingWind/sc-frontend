<template>
  <div class="courseTable">
    <Header subtitle="查看课表" />
    <el-table
      id="pdfDom"
      :data="timeData"
      stripe
      style="width: 98%">
      <el-table-column width="80" label="周" fixed="left" prop="label" align="center"></el-table-column>

      <el-table-column label="上午" align="center">
        <el-table-column
          width="100"
          v-for="(v,i) in checkColumn('上午')" :key="i"
           align="center">
          <template slot="header">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
            </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div>
                {{scope.row["class"][v.count-1].name}}<br/><br/>
                {{scope.row["class"][v.count-1].teacher}}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="下午" align="center">
        <el-table-column
          width="100"
          v-for="(v,i) in checkColumn('下午')" :key="i"
           align="center">
          <template slot="header" >
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div>
                {{scope.row["class"][v.count-1].name}}<br/><br/>
                {{scope.row["class"][v.count-1].teacher}}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="晚上" align="center">
        <el-table-column
          width="100"
          v-for="(v,i) in checkColumn('晚上')" :key="i"
          
          align="center">
          <template  slot="header">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
            </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div>
                {{scope.row["class"][v.count-1].name}}<br/><br/>
                {{scope.row["class"][v.count-1].teacher}}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col class="ex-button" :offset="2" :span="20">
        <el-button type="primary" title="导出" v-on:click="getPdf()">导出课表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      htmlTitle: "个人课表",
      courseData: [],
      timeData: [],
      titleData:[
          {
            id:'1',
            count:1,
            label:'上午',
            startTime:'08:00',
            endTime:'08:45'
          },
          {
            id:'2',
            count:2,
            label:'上午',
            startTime:'08:50',
            endTime:'09:35'
          },
          {
            id:'3',
            count:3,
            label:'上午',
            startTime:'9:50',
            endTime:'10:35'
          },
          {
            id:'4',
            count:4,
            label:'上午',
            startTime:'10:40',
            endTime:'11:25'
          },
          {
            id:'5',
            count:5,
            label:'上午',
            startTime:'11:30',
            endTime:'12:05'
          },
          {
            id:'6',
            count:6,
            label:'下午',
            startTime:'13:15',
            endTime:'14:00'
          },
          {
            id:'7',
            count:7,
            label:'下午',
            startTime:'14:05',
            endTime:'14:50'
          },
          {
            id:'8',
            count:8,
            label:'下午',
            startTime:'14:55',
            endTime:'15:40'
          },
          {
            id:'9',
            count:9,
            label:'下午',
            startTime:'15:55',
            endTime:'16:40'
          },
          {
            id:'10',
            count:10,
            label:'下午',
            startTime:'16:45',
            endTime:'17:30'
          },
          {
            id:'11',
            count:11,
            label:'晚上',
            startTime:'18:30',
            endTime:'19:15'
          },
          {
            id:'12',
            count:12,
            label:'晚上',
            startTime:'19:20',
            endTime:'20:05'
          },
          {
            id:'13',
            count:13,
            label:'晚上',
            startTime:'20:10',
            endTime:'20:55'
          },
        ]
    };
  },
  computed: {
    /*morningData: function(){
      var list = [];
      var v;
      var i;
      for ( i in this.titleData){
        console.log(v)
        console.log(v.label)
        if(v.label === '上午') list.push(v);
      }
      console.log(list);
      return list;
    }*/
  },
  mounted() {
    this.$axios.defaults.headers.common['X-Auth-Token'] = this.$store.state.user.currentUser.token;
    this.$axios.get(
    '/classes/get_selected/2020/SECOND'
    ).then(res=>{
        this.courseData = res.data["classes"];
        var i;
        var j;
        var ind;
        for(i = 1; i <= 7; i++){
          var label = this.transDay(i);
          var t_list = [];
          for(j = 1; j <= 13; j++){
            t_list.push({name:"",teacher:""});
            for (ind in this.courseData){
              var name = this.courseData[ind].courseName;
              var teacher = this.courseData[ind].teacher;
              var time = this.courseData[ind].timeSlot.split(',');
              var t;
              for(t in time){
                if(time[t].substring(0,2) === label){
                  var c_num;
                  c_num = time[t].match(/[0-9]+/g);
                  if(c_num.length == 2 && Number(c_num[0]) <= j && Number(c_num[1]) >= j || 
                    c_num.length == 1 && Number(c_num[0]) == j){
                    t_list[j - 1].name = name;
                    t_list[j - 1].teacher = teacher;
                  }
                }
              }
            }
          }
          this.timeData.push({label:label, class:t_list});
          
        }
    }).catch(req=>{
        console.log(req)
    });
  },
  methods: {
    checkColumn: function(time){
      var list = [];
      var v;
      for ( v in this.titleData ){
        if(this.titleData[v].label === time){
          list.push(this.titleData[v]);
        }
      }
      return list;
    },

    transDay: function(n){
      switch(n){
        case 1: return '周一';
        case 2: return '周二';
        case 3: return '周三';
        case 4: return '周四';
        case 5: return '周五';
        case 6: return '周六';
        case 7: return '周日';
      }
    }
  }
}
</script>

<style>
  #pdfDom{
    margin:0 auto;
  }

  .tabletitle-timeline{
    line-height: 18px!important;
  }

  .ex-button{
    display: flex;
    justify-content: right;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
