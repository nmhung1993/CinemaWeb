const mongoose = require('mongoose')
const User = mongoose.model('User')
var bcrypt = require('bcrypt')

function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

const createUser = async function (data) {
    const checkForm = validateEmail(data.email)
    if (checkForm) {
      const checkUser = await User.findOne({email: data.email})
      if (checkUser) {
        console.log('Email đã được đăng kí!')
        const result = false; const errorMessage = 'Email đã được đăng kí!'
        return {result: result, errorMessage: errorMessage}
      } else {
        // Tạo user mới
        let user = new User({
          userName: data.userName,
          password: data.password,
          email: data.email
        })
        user = await user.save()
        const result = true
        return {result: result, id: user._id}
      }
    } else {
      console.log('Email nhập vào không đúng')
      const result = false; const errorMessage = 'Email nhập vào không đúng'
      return {result: result, errorMessage: errorMessage}
    }
  }

var loginUser = async (data) => {
    var email = {email: data.email}
    var password = data.password
    const authenticated = await User.findOne(email)
    if (!authenticated) {
      console.log('Error')
    }
    let result = bcrypt.compareSync(password, authenticated.password)
  
    return {result: result, userName: authenticated}
  }

const getUser = async function (userID) {
    try {
      return await User.findById(userID)
    } catch (error) {
      throw error
    }
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    getUser: getUser
}