async function loginUser() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await requestLogin(name, password);
        if (!result.userId) {
            alert("Wrong password/username")
        } else {
            let thisPlayer = await requestPlayerInfoById(result.userId)
            let thisPlayerOp = await requestOpponent(result.userId, 1)
            if (thisPlayer.lenght === 0){
                alert("Something is wrong");
            } else {
                sessionStorage.setItem("pId", thisPlayer[0].player_id);
                sessionStorage.setItem("oId", thisPlayerOp[0].player_id);
                window.location = "game.html"
            }   
        }
    } catch (err) {
        console.log(err)
    }
}