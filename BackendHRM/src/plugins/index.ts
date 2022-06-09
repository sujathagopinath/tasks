const { registerCust } = require('../controllers/create')
const { loginCust } = require('../controllers/login')
const { getcustdata } = require('../controllers/cust')
const { tokenMiddleware } = require('../controllers/middleware')

exports.plugin = {
    name: 'custPlugin',
    register: async (server: any, options: any) => {
        server.route([
            {
                method: "POST",
                path: "/create",
                handler: registerCust,
                options: {
                    auth: false
                }
            },
            {
                method: "POST",
                path: "/login",
                handler: loginCust,
                options: {
                    auth: false
                }
            },
            {
                method: "GET",
                path: "/getdata",
                options: {
                    handler: getcustdata,
                    pre: [
                        { method: tokenMiddleware }
                    ]
                }
            },
        ])
    }
}