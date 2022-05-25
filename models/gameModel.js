var pool = require('./connection.js');

module.exports.getAllGamesInfo = async function () { 
    try {
        let sql = `select * from game, state
                   where game_state = state_id`;
        let result = await pool.query(sql);
        if (result.rows.length > 0) {
            let game = result.rows;
            return { status: 200, result: game };
        } else {
            return { status: 404, result: { msg: "No games found" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }    
}

module.exports.getGameInfoById = async function (gId) {
    try {
        let sql = `select * from game, state
                   where game_state = state_id
                   and game_room_id = $1`;
        let result = await pool.query(sql, [gId]);
        if (result.rows.length > 0) {
            let game = result.rows;
            return { status: 200, result: game };
        } else {
            return { status: 404, result: { msg: "No game with that id found" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }    
};

/*module.exports.initGame = async function (pId, opId) {
    try {

        let sql = `insert into game (game_id, game_turn_num, game_turn_first, game_player_ready, game_state, game_player_id)
                   values(default, 1, null, false, 1, $1);
                   insert into game (game_id, game_turn_num, game_turn_first, game_player_ready, game_state, game_player_id)
                   values(default, 1, null, false, 1, $2)`;
    
        let result = await pool.query(sql, [pId, opId]);
        let init = result.rows;
        return { status: 200, result: init };
      } catch (err) {
        console.log(err);
        return { status: 500, result: err };
      }
};

module.exports.endGame = async function (gId) {
    try {
        let sql = `delete from game
                   where game_id = $1;
                   ALTER SEQUENCE turn_turn_id_seq RESTART WITH 1`; // weird error: cannot insert multiple commands into a prepared statement (also when I tried to make the same thing with the deck inserts)
        let result = await pool.query(sql, [gId])
        let end = result.rows;
        return { status: 200, result: end };
    
      } catch (err) {
        console.log(err);
        return { status: 500, result: err };
      }
};*/

module.exports.changeGameState = async function(stateId, roomId){
  try {
    let sql = `update game set game_state = $1
               where game_room_id = $2`
    let result = await pool.query(sql, [stateId, roomId])
    if (result.rows.length >= 0) {
      let newState = result.rows;
      return { status: 200, result: newState };
  } else {
      return { status: 404, result: { msg: "No game with that id found" } };
  }
  } catch (err) {
    console.log(err)
    return { status: 500, result: err }
  }
}