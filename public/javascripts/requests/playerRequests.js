async function requestPlayerInfo() {
    try {
        const response = await fetch(`/api/player`);
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