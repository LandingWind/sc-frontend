export default {
    'POST /api/user/login': (req, res) => {
        const { password, username } = req.body;
        if (password === 'admin' && username === 'admin') {
            return res.json({
                user: {
                    uid: '123',
                    name: "林风",
                    major: 'CS',
                    token: 'sdfsdfsdfdsf',
                },
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
    'DELETE /api/user/:id': (req, res) => {
        // console.log(req.params.id);
        res.send({ status: 'ok', message: 'delete success!' });
    },
    'PUT /api/user/:id': (req, res) => {
        // console.log(req.params.id);
        // console.log(req.body);
        res.send({ status: 'ok', message: 'update success！' });
    },
    'POST /api/requirement/info': (req, res) => {
        const { major, grade } = req.body;
        if(major == 'ComputerScience' && grade == '2017') {
            return res.json([{
                id: "CSP001",
                score: 12.5,
                commonScore: 2.5,
                common: [
                    {id:"000001", name:"commom", score:2.5}
                ],
                neccessaryScore: 5,
                neccessary: [
                    {id:"CS0001", name:"neccessary", score:5}
                ],
                optionalScore: 5,
                optional: [
                    {id:"CS0002", name:"optional", score:5}
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
        ]);
    }
}
