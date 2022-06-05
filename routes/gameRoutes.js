var express = require('express');
var router = express.Router();
var gModel = require("../models/gameModel");

router.get('/', async function(req, res, next) {
    console.log("Get all games info")
    let result = await gModel.getAllGamesInfo();
    res.status(result.status).send(result.result);
});

router.get('/:gId/opponent/:pId', async function(req, res, next){
    let gId = req.params.gId;
    let pId = req.params.pId;
    console.log("Get opponent info from game with id " + gId);
    let result = await gModel.getOpponent(pId, gId)
    res.status(result.status).send(result.result);
});

router.get('/:gId', async function(req, res, next){
    let gId = req.params.gId;
    console.log("Get info from game with id " + gId);
    let result = await gModel.getGameInfoById(gId)
    res.status(result.status).send(result.result);
});

router.get('/:gId/playerinfo/:pId', async function(req, res, next){
    let gId = req.params.gId;
    let pId = req.params.pId
    console.log("Get info from player with id " + pId + " in game with id " + gId);
    let result = await gModel.getPlayerGameInfo(pId, gId)
    res.status(result.status).send(result.result);
});

router.post('/:gId/state', async function(req, res, next){
    let gId = req.params.gId;
    let staId = req.body.state
    console.log(`
    Changed the state of game with id ` + gId + ` to state ` + staId)
    let result = await gModel.changeGameState(staId, gId)
    res.status(result.status).send(result.result);
});

router.post('/:gId/ready', async function(req, res, next){
    let gId = req.params.gId;
    let pId = req.body.player
    console.log(`
    Changed the ready state of player with id ` + pId)
    let result = await gModel.setPlayerReady(pId, gId)
    res.status(result.status).send(result.result);
});

module.exports = router;