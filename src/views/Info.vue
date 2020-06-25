<template>
  <div class="info">
    <Header subtitle="个人信息" />
    <div class="accountview-mainbody">
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="tablebody">
            <el-row>
              <el-col :span="6">
                <el-menu default-active="1" @select="handleMenu">
                  <el-menu-item index="1">
                    <span slot="title">基本信息</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <span slot="title">更改密码</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="18">
                <el-row v-if="tabletype==='updateInfo'">
                  <el-col :span="16" :offset="3">
                    <el-form ref="form" label-width="80px" size="medium" class="margintop50">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="currentUser.name"></el-input>
                      </el-form-item>
                      <el-form-item label="个人简介" prop="intro">
                        <el-input type="textarea" :rows="5" v-model="currentUser.intro"></el-input>
                      </el-form-item>
                      <el-form-item label="学号" prop="uid">
                        <el-input v-model="currentUser.uid" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="性别" prop="gender">
                        <el-input v-model="currentUser.gender"></el-input>
                      </el-form-item>
                      <el-form-item label="学级" prop="year">
                        <el-input v-model="currentUser.year" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="学院" prop="department">
                        <el-input v-model="currentUser.department" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="专业班级" prop="majorClass">
                        <el-input v-model="currentUser.majorClass" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱">
                        <el-input v-model="currentUser.email"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号" prop="telephone">
                        <el-input v-model="currentUser.telephone"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" size="mini" @click="submitUpdateInfo">提交</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-row v-if="tabletype==='updatePassword'">
                  <el-col :span="16" :offset="3">
                    <el-form ref="form" label-width="120px" size="medium" class="margintop50">
                      <el-form-item label="旧密码">
                        <el-input v-model="oldpassword"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码">
                        <el-input v-model="newpassword" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="再次输入新密码">
                        <el-input v-model="newpassword_repeat" type="password"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" size="mini" @click="submitUpdatePassword">更改密码</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Header
  },
  data() {
    return {
      tabletype: "updateInfo",
      currentUser: {},
      oldpassword: "",
      newpassword: "",
      newpassword_repeat: ""
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    getMyInfo: function() {
      const u = this.$store.state.user.currentUser;
      this.currentUser = Object.assign({}, u);
    },
    handleMenu(index) {
      if (index === "1") {
        this.tabletype = "updateInfo";
      }
      if (index === "2") {
        this.tabletype = "updatePassword";
      }
    },
    async submitUpdatePassword() {
      const { oldpassword, newpassword, newpassword_repeat } = this;
      if (newpassword !== newpassword_repeat) {
        this.$message.error("两次输入密码不一致");
        return;
      }
      if (newpassword.length < 6 || newpassword.length > 20) {
        this.$message.error("密码位数需在6到20");
        return;
      }
      await this.$axios
        .post("/user/modify/pwd", {
          uid: this.$store.state.user.currentUser.uid,
          oldPwd: oldpassword,
          newPwd: newpassword
        })
        .then(res => {
          console.log(res);
          if (res.data.status === "OK") {
            this.$message({
              message: "已成功更换密码",
              type: "success"
            });
            // relogin
            this.$store.dispatch("setUser", null);
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async submitUpdateInfo() {
      await this.$axios.post("/user/modify/info", this.currentUser);
      await this.updateUser();
      this.getMyInfo();
      this.$message({
        message: "已成功更新我的信息",
        type: "success"
      });
    }
  },
  created: function() {
    this.getMyInfo();
  }
};
</script>

<style>
.margintop50 {
  margin-top: 50px;
}
.accountview {
  background-color: #fafafa;
  min-height: 100vh;
}
.accountview-mainbody {
  margin-top: 50px;
}
.tablebody {
  border: 1px solid #dbdbdb;
  background-color: #fff;
  min-height: 70vh;
  margin-bottom: 100px;
}
.el-menu {
  min-height: 50vh;
  border-right: 1px solid #dbdbdb !important;
}
.el-menu-item {
  font-size: 16px !important;
  text-align: left;
  padding-left: 40px !important;
  border-left: 2px solid #ffffff !important;
}
.el-form-item__content {
  text-align: left !important;
}
.el-menu-item:hover {
  border-left: 2px solid #999999 !important;
  background-color: #fafafa !important;
}
.el-menu-item.is-active {
  font-weight: 800;
  color: #323232 !important;
  background-color: #fff !important;
  border-left: 2px solid #262626 !important;
}
form label {
  font-weight: 800;
  color: #323232 !important;
  font-size: 15px !important;
}
.infobox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 30px;
}
.updatePassword-infobox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 60px;
}
.avatar {
  height: 38px;
  width: 38px;
}
.avatar img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.otherinfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
}
.updatePassword-otherinfo {
  font-size: 24px;
  margin-left: 20px;
}
.otherinfo-username {
  font-size: 18px;
  line-height: 20px;
  font-weight: 400;
  color: #2d3436;
}
</style>