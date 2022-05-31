var pool = require('./connection.js')

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

module.exports.loginCheck = async function (name, password) {
    try {
      let sql = `Select player_id, player_name 
                 from player 
                 where player_name = $1 and player_password = $2`;
      let result = await pool.query(sql,[name, password]);
      if (result.rows.length == 0) {
          return { status: 401, result: {msg: "Wrong password or username."}}
      }
      let player_id = result.rows[0].player_id;
      return { status: 200, result: {msg: "Login correct", userId : player_id} };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }