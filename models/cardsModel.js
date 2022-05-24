const res = require('express/lib/response');
var pool = require('./connection.js');

module.exports.getAllCards = async function () {
    try {
      let sql = `Select * from deck, card
                 where deck_card_id = card_id`;
      let result = await pool.query(sql);
      let cards = result.rows;
      return { status: 200, result: cards };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.getPlayerDeckById = async function (pId) {
    try {
      let sql = `Select deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp,
                 card_id, card_name, card_atk, card_effect,
                 player_id, player_name
                 from deck, card, player
                 where deck_player_id = $1 and deck_player_id = player_id and deck_card_id = card_id
                 order by deck_id asc`;
      let result = await pool.query(sql, [pId]);
      if (result.rows.length > 0) {
        let card = result.rows;
        return { status: 200, result: card };
      } else {
        return { status: 404, result: { msg: "No player with that id" } };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
  

module.exports.getCardById = async function (id) {
  try {
    let sql = `Select * from deck, card where card_id = $1 and deck_card_id = card_id`;
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) {
      let card = result.rows[0];
      return { status: 200, result: card };
    } else {
      return { status: 404, result: { msg: "No card with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.attackCardById = async function (atkValue, cId, opId) {
  try {
    let targetOnTable = await this.checkIfCardIsOnTable(opId)
    if (targetOnTable.status != 200){
      return {status: 400, result: {msg: "That card is not on the table"}}
    } else {
      let sql = `UPDATE deck SET deck_current_hp = deck_current_hp - $1
               where deck_card_id = $2
               and deck_player_id = $3`;
      let result = await pool.query(sql, [atkValue, cId, opId]);
      if (result.rows.length > 0) {
        let damage = result.rows;
        return { status: 200, result: damage };
      } else {
        return { status: 404, result: { msg: "No card with that id" } };
      }
    }
      
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.createPlayerDecks = async function (pId, opId) {
  try {

    let sql = `insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $1, 1, 1, 8);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $1, 2, 1, 6);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $1, 3, 1, 4);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $1, 4, 1, 15);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $1, 5, 1, 12);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $1, 6, 1, 3);
               
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $2, 1, 1, 8);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $2, 2, 1, 6);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $2, 3, 1, 4);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $2, 4, 1, 15);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $2, 5, 1, 12);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, $2, 6, 1, 3)`;

    let result = await pool.query(sql, [pId, opId]);
    let deck = result.rows;
    return { status: 200, result: deck };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.dropDecks = async function (pId, gId) {
  try {
    let sql = `delete from deck
               where deck_player_id = $1 or deck_player_id = $2;
               ALTER SEQUENCE deck_deck_id_seq RESTART WITH 1`;
    let result = await pool.query(sql, [pId, gId])
    let drops = result.rows;
    return { status: 200, result: drops };

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.placeCardOnSlot = async function (placeId, cardId, pId) {
  try {
    console.log([placeId, cardId, pId]);
    let res1
    let res2
    res1 = await this.checkIfSlotIsOccupied(pId, placeId)
    //res2 = await this.checkIfCardIsOnTable(pId)
     
    if(res1.status != 200){
      return res1
    } else {
      let sql = `update deck set deck_card_place = $1
                 where deck_card_id = $2 and deck_player_id = $3`;
      
      let result = await pool.query(sql, [placeId, cardId, pId])
      let place = result.rows;
      return { status: 200, result: place }

    }

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.checkIfSlotIsOccupied = async function(pId, placeId){
  try{
    let sql = `select deck_card_place
               from deck
               where deck_player_id = $1 and deck_card_place = $2`
    let result = await pool.query(sql, [pId, placeId]);
    if (result.rows.length === 0) {
      let occupied = result.rows[0];
      return { status: 200, result: occupied };
    } else {
      return { status: 400, result: { msg: "That slot is already occupied" } };
    }
  } catch (err) {
    console.log(err);
    return {status: 500, result: err}
  }
}

module.exports.checkIfCardIsOnTable = async function(pId) {
  try{
    let sql = `select deck_card_id, deck_card_place
               from deck
               where deck_player_id = $1
               and deck_card_place != 1 and deck_card_place != 8`
    let result = await pool.query(sql, [pId])
    if(result.rows.length > 0){
      let tableCard = result.rows
      return { status: 200, result: tableCard }
    } else {
      return { status: 404, result: { msg:"There are no cards on the table" } }
    }
  } catch (err) {
    console.log (err)
    return {status: 500, result: err}
  }
}

module.exports.returnCardToHand = async function(pId, cId) {
  try{
    let tableCard
    tableCard = await this.checkIfCardIsOnTable(pId)

    if(tableCard.status != 200){
      return tableCard
    } else {
      let sql = `update deck set deck_card_place = 1
                 where deck_player_id = $1 and deck_card_id = $2`
      let result = await pool.query(sql, [pId, cId])
      let returnToHand = result.rows
      return { status: 200, result: returnToHand }
    }

  } catch (err) {
    console.log(err)
    return {status: 500, result: err}
  }
}

module.exports.removeCardBecauseDeath = async function (cId, pId){
  try{
    let res1 = await this.checkIfCardIsDead(pId, cId)
    if(res1.status != 200) {
      return { status: 400, result: { msg: "That card is not dead" } }
    }

    let sql = `update deck set deck_card_place = 8
               where deck_card_id = $1
               and deck_player_id = $2`
    let result = await pool.query(sql, [cId, pId])
    let killCard = result.rows
    return { status: 200, result: killCard }
  } catch (err){
    console.log(err)
    return {status: 500, result: err}
  }
}

module.exports.checkIfCardIsDead = async function (pId, cId){
  try{
    let sql = `select * from deck
               where deck_current_hp = 0
               and deck_player_id = $1
               and deck_card_id = $2`
    let result = await pool.query(sql, [pId, cId])
    if(result.rows.length > 0){
      let deadCard = result.rows
      return { status: 200, result: deadCard }
    } else {
      return { status: 404, result: { msg:"That player's card is not dead" } }
    }
  } catch (err){
    console.log(err)
    return {status: 500, result: err}
  }
}

module.exports.getCardAtkById = async function(cId){
  try{
    let sql = `select card_atk
               from card
               and card_id = $1`
    let result = await pool.query(sql, [cId])
    if(result.rows.length > 0){
      let atk = result.rows[0]
      return { status: 200, result: atk }
    } else {
      return { status: 404, result: { msg:"No card with that id found" } }
    }
  } catch (err){
    console.log(err)
    return { status: 500, result: err }
  }
}