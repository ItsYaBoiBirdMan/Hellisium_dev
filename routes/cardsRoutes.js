var express = require('express');
var router = express.Router();
var cModel = require("../models/cardsModel");
            
router.get('/', async function(req, res, next) {
    console.log("Get all cards")
    let result = await cModel.getAllCards();
    res.status(result.status).send(result.result);
});

router.get('/playerdeck/:pId', async function(req, res, next) {
    let pId = req.params.pId;
    console.log("Get deck of player with id " + pId)
    let result = await cModel.getPlayerDeckById(pId);
    res.status(result.status).send(result.result);
});

router.post('/decks', async function(req, res, next) {
    let pId = req.body.player
    let opId = req.body.opponent
    let action = req.body.action
    if (action === "create"){
       let result = await cModel.createPlayerDecks(pId, opId);
       res.status(result.status).send(result.result);
    } else if (action === "drop"){
        let result = await cModel.dropDecks(pId, opId)
        res.status(result.status).send(result.result);
    } else
    res.status(400).send({msg:"Invalid action"})
});



router.post('/actions/player/:pId', async function(req, res, next) {
    let pId = req.params.pId;
    let cId = req.body.card;
    let plcId = req.body.place;
    let action = req.body.action;
    console.log("Player action: "+ action);
    if (action === "placeCard"){
        // I placed this paragraph on the console logs to make them stand out more
        console.log(`
        Placed card with id ` + cId + ` on slot ` + plcId)
        let result = await cModel.placeCardOnSlot(plcId, cId, pId)
        res.status(result.status).send(result.result);
    } else if (action === "returnCard") {
        console.log(`
        Returned card with id ` + cId + ` to your hand`)
        let result = await cModel.returnCardToHand(pId, cId)
        res.status(result.status).send(result.result)
    } else if (action === "attackCard"){
        let atk = req.body.atk
        let opId = req.body.opponent
        console.log(`
        Dealt ` + atk + ` damage to opponent card with id ` + cId)
        let result = await cModel.attackCardById(atk, cId, opId)
        res.status(result.status).send(result.result)
    } else if (action === "killCard"){
        console.log(`
        Card with id ` + cId + ` from player with id ` + pId + ` was killed`)
        let result = await cModel.removeCardBecauseDeath(cId, pId)
        res.status(result.status).send(result.result)
    }else
        res.status(400).send({msg:"Invalid action"})
    

});

router.post('/attackstate/player/:pId', async function(req, res, next) {
    let pId = req.params.pId
    let cId = req.body.card
    let sta = req.body.state
    if (sta === "attacked") {
        console.log(`
        Set card with id ` + cId + ` from player with id ` + pId + ` to attacked`)
        let result = await cModel.setCardToAttacked(cId, pId)
        res.status(result.status).send(result.result);
    } else if (sta === "notAttacked") {
        console.log(`
        All cards were set to not attacked`)
        let result = await cModel.setCardToNotAttacked()
        res.status(result.status).send(result.result);
    } else
    res.status(400).send({msg:"Invalid state"})
});

router.post('/reset', async function(req, res, next) {
    console.log("Reseted opponent's card hp")
    let result = await cModel.resetCardsHp();
    res.status(result.status).send(result.result);
});
module.exports = router;