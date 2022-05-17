var pool = require('./connection.js');

module.exports.getAllGamesInfo = async function () { 
    try {
        let sql = `select * from game`;
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
        let sql = `select * from game
                   where game_id = $1`;
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

module.exports.initGame = async function (pId, opId) {
    try {

        let sql = `insert into game (game_id, game_turn_num, game_turn_first, game_p1_ready, game_p2_ready, game_state, game_p1_id, game_p2_id)
                   values(default, 1, null, false, false, 1, $1, $2);`;
    
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
                   ALTER SEQUENCE turn_turn_id_seq RESTART WITH 1`;
        let result = await pool.query(sql, [gId])
        let end = result.rows;
        return { status: 200, result: end };
    
      } catch (err) {
        console.log(err);
        return { status: 500, result: err };
      }
};