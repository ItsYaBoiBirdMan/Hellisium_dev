async function requestAllCards() {
    try {
        const response = await fetch(`/api/cards`);
        if (response.status == 200) {
           var cards = await response.json();
           return cards;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestCardById(cardId) {
    try {
        const response = await fetch(`/api/cards/${cardId}`);
        if (response.status == 200) {
           var card = await response.json();
           return card;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestPlayerDeck(pId) {
    try {
        const response = await fetch(`/api/cards/playerdeck/${pId}`);
        if (response.status == 200) {
           var playerDeck = await response.json();
           return playerDeck;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestDeckCreation (pId, opId) {
    try {
        console.log({
            player: pId,
            opponent: opId,
            action: "create"
        })
        const response = await fetch(`/api/cards/decks`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              player: pId,
              opponent: opId,
              action: "create"
          })
        });
        if (response.status == 200) {
           var create = await response.json();
           return create;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestDeckDrops (pId, opId) {
    try {
        console.log({
            player: pId,
            opponent: opId,
            action: "drop"
        })
        const response = await fetch(`/api/cards/decks`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              player: pId,
              opponent: opId,
              action: "drop"
          })
        });
        if (response.status == 200) {
           var create = await response.json();
           return create;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestPlaceCardOnSlot (pId, cId, plcId) {
    try {
        console.log({
            card: cId,
            place: plcId,
            action: "placeCard"
        })
        const response = await fetch(`/api/cards/actions/player/${pId}`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              card: cId,
              place: plcId,
              action: "placeCard"
          })
        });
        if (response.status == 200) {
           var place = await response.json();
           return place;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestReturnCardToHand (pId, cId) {
    try {
        console.log({
            card: cId,
            action: "returnCard"
        })
        const response = await fetch(`/api/cards/actions/player/${pId}`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              card: cId,
              action: "returnCard"
          })
        });
        if (response.status == 200) {
           var place = await response.json();
           return place;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestAttackCard (pId, atkValue, cId, opId) {
    try {
        console.log({
            atk: atkValue,
            card: cId,
            opponent: opId,
            action: "attackCard"
        })
        const response = await fetch(`/api/cards/actions/player/${pId}`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
            atk: atkValue,
            card: cId,
            opponent: opId,
            action: "attackCard"
          })
        });
        if (response.status == 200) {
           var damage = await response.json();
           return damage;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestHpReset(){
    try {
        const response = await fetch(`/api/cards/reset`);
        if (response.status == 200) {
           var hpReset = await response.json();
           return hpReset;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}