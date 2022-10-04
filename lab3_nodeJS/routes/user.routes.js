const express = require('express')
const userModel = require('../models/user.model')
const router = new express.Router()
const auth = require('../middleware/auth')
router.post('/register', async(req, res)=>{
    try{
        const userData = new userModel(req.body)
        await userData.save()
        res.status(200).send({
            apiStatus: true,
            data:userData,
            message:'data inserted successfuly'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data:e.message,
            message:'data inserting error'
        })
    }
})
router.post('/login', async(req,res)=>{
    try{
        const user = await userModel.findUser(req.body.email, req.body.password)
         const token = await user.generateToken()
        res.send({user, token})
    }
    catch(e){
        res.send(e.message)
    }
})
router.get('/profile', auth, async(req,res)=>{
    res.send(req.user)
})

router.post('/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('logged out')
    }
    catch(e){
        res.status(500).send({error:e.message})
    }
})
router.post('/logout', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((t)=>{
            return t.token !==req.token
        })
        await req.user.save()
        res.send('logged out')
    }
    catch(e){
        res.status(500).send({error:e.message})
    }
})


module.exports= router