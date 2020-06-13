const basicStudent = {
    uid: '123',
    name: "林风",
    stuid: "317010xxxx",
    gender: "男",
    currentStage: "2017",
    studyYear: 4,
    address: "XX省XX市XX县",
    college: "计算机学院",
    major: '计算机科学与技术',
    token: 'sdfsdfsdfdsf',
    type: "student",
    introduction: "hello world i like golang",
    email: "xxx@zju.edu.cn",
    mobile: 13333333333
}
let basicUser = {
    password: "admin",
    username: "admin"
}
const allClassList = [
    {
        id: "qwer12",
        classname: "统筹学",
        teacher: "汪鞅",
        storage: 100,
        selected: 40,
    },
    {
        id: "qwer13",
        classname: "高等代数",
        teacher: "汪明",
        storage: 140,
        selected: 140,
    },
    {
        id: "qwer14",
        classname: "线性代数",
        teacher: "李能",
        storage: 200,
        selected: 10,
    },
]
const selectedClassList = [
    {
        id: "qwer14",
        classname: "线性代数",
        teacher: "李能",
        storage: 200,
        selected: 10,
    },
]
export default {
    'POST /api/user/login': (req, res) => {
        const { password, username } = req.body;
        if (password === basicUser.password && username === basicUser.username) {
            return res.json({
                user: basicStudent,
                status: "login pass",
                code: 200
            });
        } else {
            return res.json({
                status: 'password wrong',
                code: 403,
            });
        }
    },
    'POST /api/user/info': (req, res) => {
        const { token } = req.body;
        if (token === "sdfsdfsdfdsf") {
            return res.json({
                user: basicStudent
            })
        }
    },
    'GET /api/user/getuserinfo': (req, res) => {
        return res.json({
            user: basicStudent,
            code: 200
        })
    },
    'POST /api/user/updatebasicinfo': (req, res) => {
        const currentUser = req.body;
        return res.json({
            user: Object.assign(basicStudent, currentUser),
            code: 200
        })
    },
    'POST /api/user/updatepassword': (req, res) => {
        const {
            oldpassword,
            newpassword
        } = req.body;
        if (oldpassword === basicUser.password) {
            basicUser.password = newpassword;
            return res.json({
                code: 200
            })
        }
        else return res.json({
            msg: "旧密码不正确",
            code: 4001
        })
    },
    'POST /api/class/list': (req, res) => {
        const {
            conditions
        } = req.body;
        console.log("conditions", conditions)
        return res.json({
            classlist: allClassList,
            code: 200
        })
    },
    'POST /api/class/selected': (req, res) => {
        const {
            token,
            uid
        } = req.body;
        return res.json({
            classlist: selectedClassList,
            code: 200
        })
    },
}
