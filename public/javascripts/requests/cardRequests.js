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
           var room = await response.json();
           return room;
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
           var room = await response.json();
           return room;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestCreateDecks() {
    try {
        const response = await fetch(`/api/cards/decks`);
        if (response.status == 200) {
           var decks = await response.json();
           return decks;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestResetDecks() {
    try {
        const response = await fetch(`/api/cards/decks/drops`);
        if (response.status == 200) {
           var decks = await response.json();
           return decks;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}