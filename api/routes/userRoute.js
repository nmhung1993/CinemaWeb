const express = require('express')
const router = express.Router()
var jwt = require('jwt-simple')
var JWT_SECRET = 'sieuBaoMat'
// const User = require('../models/userModel')
const userController = require('../controllers/userController')

router.post('/signup', async function (req, res) {
  try {
    let result = await userController.createUser(req.body)
    if (result.result) {
      const token = jwt.encode(req.body, JWT_SECRET)
      return res.json({token: token, userName: req.body.userName, id: result.id})
    } else {
      return res.send({errorMessage: result.errorMessage})
    }
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.put('/signin', async function (req, res) {
  try {
    let result = await userController.loginUser(req.body)
    if (result.result) {
      var token = jwt.encode(req.body, JWT_SECRET)
      return res.json({token: token, username: result.username})
    } else {
      return res.send({errorMessage: result.errorMessage})
    }
  } catch (e) {
    console.log(e)
    return res.send(e)
  }
})
router.get('/:userID', async function (req, res) {
  var userID = req.params.userID;

  User.findOne({userID:userID}).then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.put('/:userID', async (req, res) => {
  var query = { userID: req.params.userID };

  User.findOneAndUpdate(query, {
    role: req.body.role,
    password: req.body.password
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Invalid user');
    }
    res.send(raw);
  });
});

router.delete('/:userID', async (req, res) => {
  var query = { userID: req.params.userID };
  User.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid userName');
      }
    res.send(raw);
  });
});

module.exports = router ;
