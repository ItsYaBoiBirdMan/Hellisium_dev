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

async function initializeGame (pId, opId) {
    try {
        console.log({
            player: pId,
            opponent: opId,
            action: "init"
        })
        const response = await fetch(`/api/game/init`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              player: pId,
              opponent: opId,
              action: "init"
          })
        });
        if (response.status == 200) {
           var init = await response.json();
           return init;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function terminateGame (gId) {
    try {
        console.log({
            game: gId,
            action: "end"
        })
        const response = await fetch(`/api/game/init`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              game: gId,
              action: "end"
          })
        });
        if (response.status == 200) {
           var end = await response.json();
           return end;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestGameInfoByPlayerId (pId) {
    try {
        const response = await fetch(`/api/game/playergame/${pId}`);
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