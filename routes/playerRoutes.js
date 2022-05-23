var express = require('express');
var router = express.Router();
var pModel = require("../models/playerModel");

router.get('/', async function(req, res, next) {
    let result = await pModel.getPlayerInfo();
    res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Get player with Id " + id)
    let result = await pModel.getPlayerInfoById(id);
    res.status(result.status).send(result.result);
});

router.post('/login', async function(req, res, next) {
    console.log("Login player ");
    let username = req.body.username;
    let password = req.body.password;
    let result = await pModel.login(username,password);
    res.status(result.status).send(result.result);
  });
  

module.exports = router;