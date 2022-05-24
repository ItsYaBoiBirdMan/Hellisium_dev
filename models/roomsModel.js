var pool = require('./connection.js')

module.exports.getAllRooms = async function () {
    try{
        let sql = `select * from room`
        let result = await pool.query(sql);
        if (result.rows.length > 0) {
            let rooms = result.rows;
            return { status: 200, result: rooms };
        } else {
            return { status: 404, result: { msg: "No rooms found" } };
        }
    } catch (err){
        console.log(err)
        return { status: 500, result: err }
    }
}