var express = require('express');
var router = express.Router();
var gModel = require("../models/gameModel");

router.get('/', async function(req, res, next) {
    console.log("Get all games info")
    let result = await gModel.getAllGamesInfo();
    res.status(result.status).send(result.result);
});

router.get('/:gId', async function(req, res, next){
    let gId = req.params.gId;
    console.log("Get info from game with id " + gId);
    let result = await gModel.getGameInfoById(gId)
    res.status(result.status).send(result.result);
});

router.post('/init/player/:pId/opponent/:opId', async function(req, res, next){
    let pId = req.params.pId
    let opId = req.params.opId
    console.log("Initialize game with player " + pId + " and opponent " + opId)
    let result = await gModel.initGame(pId, opId);
    res.status(result.status).send(result.result);
})

router.post('/end/:gId', async function(req, res, next){
    let gId = req.params.gId
    console.log("Ended game with id " + gId)
    let result = await gModel.endGame(gId)
    res.status(result.status).send(result.result);
})

module.exports = router;