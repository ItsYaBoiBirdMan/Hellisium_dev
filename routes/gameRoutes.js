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

router.post('/:gId/state', async function(req, res, next){
    let gId = req.params.gId;
    let staId = req.body.state
    console.log(`
    Changed the state of game with id ` + gId + ` to state ` + staId)
    let result = await gModel.changeGameState(staId, gId)
    res.status(result.status).send(result.result);
});

module.exports = router;