const { sample, addEmp } = require('../controllers/employees/index')
const Joi = require('joi')

module.exports = [
    {
        method: "GET",
        path: "/sample",
        handler: sample,
    },
    {
        method: "POST",
        path: '/addemp',
        handler: addEmp,
        options: {
            description: 'Add Employee',
            notes: 'Returns an Added Emp',
            tags: ['api'],
        },
    },
    {
        method: 'GET',
        path: '/',
        handler: (request: any, _h: any) => {
            request.session.views = request.session.views + 1 || 1;
            return 'Views: ' + request.session.views;
        },
    }
]