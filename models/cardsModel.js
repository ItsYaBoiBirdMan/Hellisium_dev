var pool = require('./connection.js');
var ply = require('./playerModel')

module.exports.getAllCards = async function () {
    try {
      let sql = `Select * from card`;
      let result = await pool.query(sql);
      let cards = result.rows;
      return { status: 200, result: cards };
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

module.exports.attackCardById = async function (id) {
  try {
    let sql = `UPDATE deck SET deck_current_hp = deck_current_hp - 1
               where card_id = $1`;
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) {
      let damage = result.rows[0];
      return { status: 200, result: damage };
    } else {
      return { status: 404, result: { msg: "No card with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.createPlayerDecks = async function () {
  try {

    let sql = `insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, 1, 1, 1, 8);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, 1, 2, 1, 6);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, 1, 3, 1, 4);
               
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, 2, 1, 1, 8);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, 2, 2, 1, 6);
               insert into deck(deck_id, deck_player_id, deck_card_id, deck_card_place, deck_current_hp)
               values(default, 2, 3, 1, 4)`;

    let result = await pool.query(sql);
    let deck = result.rows;
    return { status: 200, result: deck };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.dropDecks = async function () {
  try {
    let sql = `delete from deck;
               ALTER SEQUENCE deck_deck_id_seq RESTART WITH 1`;
    let result = await pool.query(sql)
    let drops = result.rows;
    return { status: 200, result: drops };

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}