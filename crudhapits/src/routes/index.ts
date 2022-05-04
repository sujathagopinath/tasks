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
        options: {
            description: 'Add Employee',
            notes: 'Returns an Added Emp',
            tags: ['api'],
            handler: addEmp,

        }
    }
]