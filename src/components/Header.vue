<template>
  <div class="header">
    <el-row class="rowbox">
      <el-col :span="6">
        <p class="title" @click="gotoHome">
          选课系统
          <span class="subtitle">{{subtitle}}</span>
        </p>
      </el-col>
      <el-col :span="6" :offset="12" class="v_center leftpop">
        <el-dropdown @command="handleCommand">
          <el-button type="primary">
            {{this.getUserName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <!-- <el-tag size="small">{{this.getUserType}}</el-tag> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="reqtable">培养方案</el-dropdown-item>
            <el-dropdown-item command="classlist">选课</el-dropdown-item>
            <el-dropdown-item command="control" v-if="isAdmin">管理员控制</el-dropdown-item>
            <el-dropdown-item
              command="stuepxort"
              v-if="isAdmin || isTeacher"
            >导出学生列表</el-dropdown-item>
            <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import {  } from "vuex";

export default {
  props: {
    subtitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    async unlogin() {
      console.log("login out");
      await this.$axios.post('/session/logout');
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      this.$router.push("/login");
    },
    gotoHome() {
      this.$router.push("/");
    },
    gotoInfo() {
      this.$router.push("/info");
    },
    gotoClassList() {
      this.$router.push("/classlist");
    },
    gotoReqtable() {
      this.$router.push("/reqtable");
    },
    handleCommand(command) {
      if (command === "loginout") this.unlogin();
      if (command === "info") this.gotoInfo();
      if (command === "reqSet") this.gotoReqSet();
      if (command === "courseTable") this.gotoCourseTable();
      if (command === "classlist") this.gotoClassList();
      if (command === "reqtable") this.gotoReqtable();
    }
  },
  computed: {
    getUserName() {
      return this.$store.state.user.currentUser?.name || "";
    },
    getUserType() {
      const { type } = this.$store.state.user.currentUser;
      if (type === "student") return "学生";
      if (type === "admin") return "管理员";
      if (type === "teacher") return "教师";
      return "";
    },
    getUserTypeOri() {
      return this.$store.state.user.currentUser.type;
    },
    isAdmin() {
      const type = this.$store.state.user.currentUser.type;
      return type==='System Administrator' || type==='Teaching Administrator';
    },
    isTeacher() {
      const type = this.$store.state.user.currentUser.type;
      return type==='Teaching Administrator' || type==='Teacher';
    },
    isStudent() {
      const type = this.$store.state.user.currentUser.type;
      return type==='Student';
    }
  }
};
</script>

<style>
el-col {
  height: 100%;
}
.header {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rowbox {
  padding-left: 100px;
  padding-right: 100px;
}
.title {
  font-size: 20px;
  cursor: pointer;
}
.subtitle {
  font-size: 15px;
  color: gray;
}
.v_center {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.leftpop {
  justify-content: flex-end;
}
.rowplay {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>