var pool = require('./connection.js')

module.exports.getPlayerInfo = async function () { 
    try {
        let sql = `select player_id, player_name, player_hp
                   from player`;
        let result = await pool.query(sql);
        if (result.rows.length > 0) {
            let players = result.rows;
            return { status: 200, result: players };
        } else {
            return { status: 404, result: { msg: "No players found" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }    
}

module.exports.getPlayerInfoById = async function (id) {
    try {
        let sql = `select player_id, player_name, player_hp
                   from player 
                   where player_id = $1`
        let result = await pool.query(sql, [id]);
        if (result.rows.length > 0) {
            let player = result.rows;
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No player with that id found" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }    
}
