<template>
    <div class="SetTime">
        <UpdateTime upTitle="第一轮选课" v-bind:id="timeBlock[0].id" v-bind:Ddate="[timeBlock[0].start, timeBlock[0].end]"/>
        <update-time upTitle="第二轮选课" v-bind:id="timeBlock[1].id" v-bind:Ddate="[timeBlock[1].start, timeBlock[1].end]"/>
        <update-time upTitle="第三轮选课" v-bind:id="timeBlock[2].id" v-bind:Ddate="[timeBlock[2].start, timeBlock[2].end]"/>
        <update-time upTitle="补选" v-bind:id="timeBlock[3].id" v-bind:Ddate="[timeBlock[3].start, timeBlock[3].end]"/>
        <div class="SetConnect" style="margin: 20px;">
            <el-row>
                <span>设置连接数</span><br/>
                <el-col style="margin:20px;" :offset="2" :span="20">
                    <el-input-number v-model="num"  :min="1" :max="200" label="连接数"></el-input-number>
                    <el-button type="primary" title = "设置连接数" @click="handleChange()">设置</el-button>
                </el-col>
            </el-row>
        </div>

        <div style="margin: 20px;">
            <el-row>
                <span style="float: left; text-align: left;">导出学生名单</span><br/>
                <el-col style="margin:20px;" :offset="2" :span="20">
                    <el-input placeholder="请输入课程ID" v-model="classId" class="input-with-select">
                        <el-button type="primary" title="导出名单" slot="append" icon="el-icon-download" @click="handleExport()">导出名单</el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <div style="margin: 20px;">
            <el-row>
                <span style="float: left; text-align: left;">管理员选课</span><br/>
                <el-col style="margin:20px;" :offset="2" :span="20">
                    <el-input style="margin:5px;" placeholder="请输入课程ID" v-model="input1" class="input-with-select">
                    </el-input>
                    <el-input style="margin:5px;" placeholder="请输入学生ID" v-model="input2" class="input-with-select">
                    </el-input>
                    <el-button style="margin:5px;" type="primary" title="导出名单" icon="el-icon-plus" @click="handleRegister()">添加学生进入课程</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import UpdateTime from './subviews/UpdateTime.vue'
export default {
    components: {
        UpdateTime
    },
    data(){
        return {
            num: 50,
            timeBlock: [
            {id:"0", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"},
            {id:"2", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"},
            {id:"3", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"},
            {id:"4", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"}
            ],
            classId: "",
            input1: "",
            input2: ""
        }
    },
    mounted() {
        this.$axios.defaults.headers.common['X-Auth-Token'] = this.$store.state.user.currentUser.token;
        this.$axios.get(
            "/selection_time/show"
        ).then( res => {
            this.timeBlock = res.data["timeList"];
            //console.log(this.timeBlock)
        }

        ).catch( error => {
            console.log(error)
        });
    },
    methods: {
        handleChange: function(){
            if(this.$store.state.user.currentUser.type != "System Administrator"){
                this.$message.error("没有权限")
            }
            this.$axios.defaults.headers.common['X-Auth-Token'] = this.$store.state.user.currentUser.token;
            this.$axios.post(
                "/set_connect/change",
                {
                    num: this.num
                }
            ).then( res => {
                console.log(res);
                this.$message(
                    {
                    type: "success",
                    message: "修改成功"
                    }
                )
            }).catch( error => {
                console.log(error);
                this.$message.error("修改失败")
            })
        },
        handleExport: function(){
            this.$axios.defaults.headers.common['X-Auth-Token'] = this.$store.state.user.currentUser.token;
            this.$axios({url:`/excel/download/classes/${this.classId}`,  
                responseType: 'blob',
            }).then(res => {
                let url = window.URL.createObjectURL(new Blob([res.data]));
                let link = document.createElement("a");
                link.style.display = "none";
                link.href = url;
                link.setAttribute("download", this.classId + ".xlsx");

                document.body.appendChild(link);
                //console.log(res);

                link.click();
                document.body.removeChild(link)
            })
        },
        handleRegister: function(){
            this.$axios.defaults.headers.common['X-Auth-Token'] = this.$store.state.user.currentUser.token;
            this.$axios.post('/classes/admin_register',
            {
                'uid': this.input2,
                'classId': this.input1
            }).then(res => {
                this.$message(
                    `选课结果：${res.data.status}`
                )
            }).catch(error => {
                this.$message.error(error)
            })
        }
    }
    
}
</script>
<style scoped>
.SetTime{
    margin: 20px;
}
.SetConnect{
    margin: 20px;
}
</style>