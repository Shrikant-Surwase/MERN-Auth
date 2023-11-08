const express = require('express')
const {signup,login, verifyToken, getUser} = require('../controller/userController')
const router  = express.Router()

router.get('/',(req,res,next)=>{
    res.send("hello page")
})

router.post('/signUp', signup);
router.post('/login', login);
router.get('/verifyToken',verifyToken,getUser);


module.exports = router