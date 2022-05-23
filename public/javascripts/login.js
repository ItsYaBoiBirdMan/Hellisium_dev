async function login() {
    try {
        let name = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        let player = await requestLogin(name,pass);
        if (!player.player_id) {
            alert(player.msg);
        } else {
            let game = await requestGameInfoByPlayerId(player.player_id);
            if (game.length == 0) alert("That player has no matches");
            else {
                /*// get first match
                let pmatch = game[0];
                let omatch = await requestOpponentInfo(player.ply_id,pmatch.pm_id,pmatch.pm_match_id);
                sessionStorage.setItem("pId",pmatch.pm_id);
                sessionStorage.setItem("oId",omatch.pm_id);
                sessionStorage.setItem("mId",pmatch.pm_match_id);*/
                window.location = "game.html"                
            }
        }
    } catch (err) {
        console.log(err);
    }
}