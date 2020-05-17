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
}
