const express = require("express");
const { prismaClient } = require("../application/database");
const publicRouter = new express.Router();

publicRouter.post('/',(req, res)=>{
    if (!req.body.username){
        res.send('Username is Empty!')
    }

    if (!req.body.password){
        res.send('Password is Empty!')
    }
    
    if (req.body.username !== 'Admin' ){
        res.send('Username not Registered')
    }

    if (req.body.password !== 'Admin123' ){
        res.send('Password is false')
    }
    res.json({success:true, status:200})
})

publicRouter.get('/user',async(req, res)=>{
    const data = await prismaClient.User.findMany({
        select:{
            id:true,
            email:true,
            name:true,
        }
    });
    return res.status(200).json({
        data:data
    })
})

module.exports = {publicRouter};