const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { roles } = require('../utils/constants')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [roles.admin, roles.client],
    default: roles.client
  }
});

//Popuplating this field of books to user s
UserSchema.virtual('books', {
  ref: 'Book',
  foreignField: 'createdBy',
  localField: '_id',
});
UserSchema.set('toJSON', { virtuals: true });

//hashpassword
UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashpassword = await bcrypt.hash(this.password, salt)
      this.password = hashpassword;
      if (this.email === 'admin@gmail.com') {
        this.role = roles.admin

      }
    }
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password); //returns promise async function
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
