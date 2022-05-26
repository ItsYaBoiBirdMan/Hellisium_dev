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