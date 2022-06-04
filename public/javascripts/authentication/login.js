async function loginUser() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await requestLogin(name, password);
        if (result.logged) {
            sessionStorage.setItem("pId",result.player_id);
            let op = await requestOpponent(result.player_id, 1)
            sessionStorage.setItem("oId",op.player_id);
            window.location = "game.html"
        } else {
            alert("Wrong password/username")
        }
    } catch (err) {
        console.log(err)
    }
}