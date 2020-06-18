<template>
  <div class="login">
    <div id="web_bg"></div>
    <el-row type="flex" justify="center">
      <el-col :span="6" class="box">
        <el-row type="flex" class="title_area" justify="center">
          <p class="title">选课系统</p>
        </el-row>
        <el-row type="flex" class="input_area" justify="center">
          <el-col :span="20">
            <el-input class="textbox" placeholder="username" v-model="username" clearable></el-input>
            <el-input class="textbox" placeholder="password" v-model="password" show-password></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="btn_area" justify="center">
          <el-col :span="20">
            <el-button type="primary" style="width:100%;" v-on:click="handleLogin">Login</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    handleLogin: function() {
      const { username, password } = this;
      this.$axios
        .post("user/login", {
          username,
          password
        })
        .then(res => {
          const code = res.data.code;
          if (code === 200) {
            this.$message({
              message: res.data.status,
              type: "success"
            });
            this.setUser(res.data.user);
            this.$router.push("/");
          } else if (code === 403) {
            this.$message({
              message: res.data.status,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped>
#web_bg {
  background-image: url("http://static.oneplus.cn/data/attachment/forum/201902/14/094556jol85zsos89g2188.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.box {
  margin-top: 80px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 20px;
}
.title_area {
  margin-bottom: 30px;
}
.textbox {
  margin-bottom: 10px;
}
.btn_area {
  margin-top: 20px;
}

.title {
  font-weight: bolder;
  font-size: 20px;
}
</style>