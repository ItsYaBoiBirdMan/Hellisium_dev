async function requestGamesInfo() {
    try {
        const response = await fetch(`/api/game`);
        if (response.status == 200) {
           var games = await response.json();
           return games;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestGameInfoById (gId) {
    try {
        const response = await fetch(`/api/game/${gId}`);
        if (response.status == 200) {
           var game = await response.json();
           return game;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}