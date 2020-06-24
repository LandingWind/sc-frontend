<template>
    <div class = "UpdateTime">
        <el-row>
            <span class="demonstration">{{upTitle}}</span><br/>
            <el-col :offset="2" :span="20" class="block">
                <el-date-picker
                v-model="value1"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
                <el-button type="primary" v-on:click="update()">设置</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        upTitle: {
            type: String,
            default: "选课时间"
        },
        id: {
            type: String,
            default: ""
        },
        Ddate: {
            type: Array,
            default: ()=>[new Date(2020, 6, 10, 10, 10), new Date(2020, 6, 11, 10, 10)]
        }
    },
    data() {
        return {
            value1: this.Ddate,
            tid: this.id
        };
    },
    mounted() {
        
    },
    methods: {
        update: function(){
            this.$axios.defaults.headers.common['X-Auth-Token'] = this.$store.state.user.currentUser.token;
            this.$axios.post( "/selection_time/modify",
                {id:this.tid, start:this.value1[0].toString(), end:this.value1[1].toString() }
            ).then( res => {
                console.log(res)
                if(res.data.status === "Time modified"){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }
                else{
                    this.$message.error(`修改失败${res.data.status}`)
                }
            }

            ).catch( error => {
                this.$message.error('修改失败')
                console.log(error)
            }
            )
        }
    }
}
</script>>
<style>
.demonstration{
    
    float: left;
    text-align: left;
}

.UpdateTime{
    margin: 20px;
}

.block{
    margin: 20px;
}
</style>