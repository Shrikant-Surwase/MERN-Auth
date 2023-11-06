const express = require('express')
const {signup,getData,login} = require('../controller/userController')
const router  = express.Router()

router.get('/',(req,res,next)=>{
    res.send("hello page")
})
router.get('/getData',getData)
router.post('/signUp', signup);
router.post('/login', login);

module.exports = router