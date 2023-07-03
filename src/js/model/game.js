import { db, playerID } from "../firebase";
import { ref, get, child, onValue, update } from "firebase/database";
import { getPlayerCount } from "./matches";
import { startingDeck } from "../cards";
import { shuffleArray } from "../utils";

// Takes in the ID of the match you want to listen to and a callback function
// Calls the callback every time the data in the match changes
export const addMatchListener = (id, cb) => {
    const matchesRef = ref(db, `matches/${id}`);
    onValue(matchesRef, (res) => {
        const data = res.val();
        cb(data);
    });
} 

export const startGame = async (matchID, matchData) => {
    const matchesRef = ref(db, `matches/${matchID}`);

    for (const playerID in matchData.players) {
        let player = matchData.players[playerID];
        player.deck = shuffleArray(startingDeck);
        player.hand = [];
        // Build the player's hand
        for (let i = 0; i < 5; i++) {
            drawCard(player);
        }
    }
    matchData.started = true;
    matchData.playerTurn = playerID;

    await update(matchesRef, matchData);
    startTurn(matchID, matchData);
}

export const startTurn = async (matchID, matchData) => {
    const matchRef = ref(db, `matches/${matchID}`);
    const playerRef = child(matchRef, `players/${matchData.playerTurn}`);
    let playerData = (await get(playerRef)).val();

    playerData.actions = 1;
    playerData.buys = 1;
    playerData.money = 0;

    update(playerRef, playerData);
}

export const isGameStartable = (matchData) => {
    const playerCount = getPlayerCount(matchData);
    return playerCount >= 2 && !matchData.started;
}

export const drawCard = async (player) => {
    if (player.deck.length === 0) {
        // Reshuffle discard pile into deck
        player.deck = shuffleArray(player.discard);
        player.discard = [];
    }

    player.hand.push(player.deck.pop());
}

export const playCard = async (matchID, matchData, cardData) => {
    if (cardData.type === 'action') {
        cardData.action();
    }
    // dispatch('playCard', card)
}