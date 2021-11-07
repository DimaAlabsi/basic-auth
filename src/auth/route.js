"use strict";
const express= require("express");
const bcrypt=require('bcrypt');
const base64=require("base-64");
const {Users}= require('./models/index');
const basicAuth=require('./middleware/auth.middleware')
const Router=express.Router();


Router.post('/signup',async(req,res)=>{
    try{
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await Users.create(req.body);
        res.status(201).json(record);
      } catch (error) {
        res.status(403).send("Error occurred 🙃");
      
    }
})

Router.post('/signin',basicAuth, async (req, res) => {
    const user = req.user;

    res.status(200).json(user);

  });

  module.exports=Router;