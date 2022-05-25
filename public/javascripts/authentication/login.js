async function loginUser() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await requestLogin(name, password);
        if (result.logged) {
            window.location = "room.html"
            sessionStorage.setItem("pId",result.player_id);
            sessionStorage.setItem("oId",result.player_id);
        } else {
            document.getElementById("result").innerHTML = "Wrong username or password";
        }
    } catch (err) {
        console.log(err)
    }
}