const mongoose = require('mongoose')
const User = mongoose.model('User')
const responseStatus = require('../configs/responseStatus')
var bcrypt = require('bcrypt')

function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

const createUser = async function (data) {
    try{
        const validEmail = validateEmail(data.email)
        if (validEmail) {
            const authenticated = await User.findOne({email: data.email})
            if (authenticated) {
                const result = false; const errorMessage = responseStatus.WRONG_EMAIL_OR_PASSWORD
                console.log(errorMessage)
                return {result: result, errorMessage: errorMessage}
            } else {
                let user = new User({
                userName: data.userName,
                password: data.password,
                email: data.email
                })
                let encryptedPassword = bcrypt.hashSync(data.password, 10)
                user.password = encryptedPassword
                user = await user.save()
                const result = true
                return {result: result, id: user._id}
            }
        } else {
        const result = false; const errorMessage = responseStatus.WRONG_EMAIL_OR_PASSWORD
        console.log(errorMessage)
        return {result: result, errorMessage: errorMessage}
        }
    }catch(e){ 
        throw e
    }
  }

var loginUser = async function (data) {
    try{
        var email = {email: data.email}
        var password = data.password
        const authenticated = await User.findOne(email)
        if (authenticated) {
            let result = bcrypt.compareSync(password, authenticated.password)
            return {result: result, userName: authenticated}
        }else{
            const result = false; const errorMessage = responseStatus.WRONG_EMAIL_OR_PASSWORD
            console.log(errorMessage)
            return {result: result, errorMessage: errorMessage}
        }
    } catch (e) {
        throw e
    }
  }

module.exports = {
    createUser: createUser,
    loginUser: loginUser
}