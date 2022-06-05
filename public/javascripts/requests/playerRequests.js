async function requestPlayerInfo() {
    try {
        const response = await fetch(`/api/players`);
        if (response.status == 200) {
           var players = await response.json();
           return players;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestPlayerInfoById(pId) {
    try {
        const response = await fetch(`/api/players/${pId}`);
        if (response.status == 200) {
           var player = await response.json();
           return player;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestLogin(name, password) {
    try {
        const response = await fetch(`/api/players/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                name: name, 
                password: password
            }) 
        });
        var result = await response.json();
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function logout() {
    try {
        const response = await fetch(`/api/players/logout`,
        {
            method: "POST",
        });
        var  result= await response.json();
        return {success: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}