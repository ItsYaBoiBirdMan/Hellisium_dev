var express = require('express');
var router = express.Router();
var cModel = require("../models/cardsModel");
            
router.get('/', async function(req, res, next) {
    console.log("Get all cards")
    let result = await cModel.getAllCards();
    res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Get card with Id " + id)
    let result = await cModel.getCardById(id);
    res.status(result.status).send(result.result);
});

router.get('/playerdeck/:pId', async function(req, res, next) {
    let pId = req.params.pId;
    console.log("Get deck of player with id " + pId)
    let result = await cModel.getPlayerDeckById(pId);
    res.status(result.status).send(result.result);
});

router.post('/decks', async function(req, res, next) {
    console.log('Decks created')
    let result = await cModel.createPlayerDecks();
res.status(result.status).send(result.result);
});

router.post('/decks/drops', async function(req, res, next) {
    console.log('Decks droped')
    let result = await cModel.dropDecks();
    res.status(result.status).send(result.result);
});

router.post('/actions/:pId/:cId/:plcId', async function(req, res, next) {
    let pId = req.params.pId;
    let cId = req.params.cId;
    let plcId = req.params.plcId;
    let action = req.body.action;
    console.log("Player action: "+ action);
    if (action === "placeCard"){
        let result = await cModel.placeCardOnSlot(plcId, cId, pId)
        res.status(result.status).send(result.result);
    } else
    res.status(400).send({msg:"Invalid action"})
    

});


module.exports = router;