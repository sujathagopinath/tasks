// const express = require('express');
// const user = require('../models/User');
// const adminRouter = express.Router();
// const mongoose = require('mongoose');
// const { roles } = require('../utils/constants');

// adminRouter.get('/users', async (req, res, next) => {
//     try {
//         const users = await user.find()
//         res.send(users)
//     } catch (error) {
//         next(error)
//     }
// })

// adminRouter.get('/profile', async (req, res, next) => {
//     try {
//         const { id } = req.params
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             res.status(404);
//             res.send("No ID is found")
//             return;
//         }
//         await User.findById(id)
//             .then(person => {
//                 if (person) {
//                     res.status(200);
//                     res.send(person);
//                 }
//                 else {
//                     res.status(404);
//                     res.send('No User is  found')
//                 }
//             }
//             )
//     }
//     catch (error) {
//         next(error)
//     }

// })

// adminRouter.post('/update', async (req, res, next) => {
//     const { id, role } = req.body
//     if (!id || !role) {    //id role doesnot exists
//         res.status(401);
//         res.send('Invalid request')
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(401)
//         res.send('Invalid Id')
//     }
//     const rolesArray = Object.values(roles);
//     if (!rolesArray.includes(role)) {
//         res.status(401)
//         res.send('Invalid role');
//     }
//     if (req.user.id === id) {
//         res.send('Admin cannot change their role ask another Admin to change');

//     }

//     const user = await User.findByIdAndUpdate(
//         id,
//         { role: role },
//         { new: true, runValidators: true }
//     )
//     res.send(`updated role for ${user.email} to ${user.role}`)
// })


// module.exports = router