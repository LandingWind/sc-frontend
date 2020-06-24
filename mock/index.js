import { allClassList, selectedClassList } from './classlist'

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
const step = 2;
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
    'POST /api/requirement/info': (req, res) => {
        const { major, grade } = req.body;
        if(major == 'ComputerScience' && grade == '2017') {
            return res.json([{
                id: "CSP001",
                credit: 12.5,
                commonCredit: 2.5,
                common: [
                    {id:"000001", name:"commom", credit:2.5}
                ],
                neccessaryCredit: 5,
                neccessary: [
                    {id:"CS0001", name:"neccessary", credit:5}
                ],
                optionalCredit: 5,
                optional: [
                    {id:"CS0002", name:"optional", credit:5}
                ]
            }]);
        }
        else{
            return res.json(null);
        }
    },
    'POST /api/user/setrequirement': (req, res) => {
        res.send({ staus: 'ok', message: 'update success!' });
    },
    'POST /api/major/list': (req, res) => {
        return res.json([
            "ComputerScience", "Mathematics", "Physics"
        ])
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
            conditions,
            pagination
        } = req.body;
        console.log("pagination", pagination)
        const {
            index,
            limit
        } = pagination;
        const start = (index - 1) * limit;
        let end = index * limit;
        if (end > allClassList.length) end = allClassList.length;
        return res.json({
            classlist: allClassList.slice(start, end),
            code: 200
        })
    },
    'GET /api/classes/get_selected/2020/SECOND': (req, res) => {
        return res.json({
            classes: selectedClassList,
            code: 200
        })
    },
    'POST /api/class/choose': (req, res) => {
        const {
            id,
            uid
        } = req.body;
        return res.json({
            code: 200
        })
    },
    'GET /api/class/step': (req, res) => {
        return res.json({
            step: step,
            code: 200
        })
    },
    'GET /api/class/number': (req, res) => {
        return res.json({
            number: allClassList.length,
            code: 200
        })
    },
    'GET /api/selection_time/show': (req, res) => {
        return res.json({timeList:[
            {id:"0", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"},
            {id:"2", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"},
            {id:"3", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"},
            {id:"4", "start":"2020-6-18 02:00", end:"2020-6-19 02:00"}
        ]})
    },

    'POST /api/selection_time/modify': (req, res) => {
        console.log(req);
        return res.json({
            status:"Time modified",
            code: 200
        })
    }
}
