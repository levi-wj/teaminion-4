import { db, playerID } from "../firebase";
import { ref, get, child, onValue, update } from "firebase/database";
import { getPlayerCount } from "./matches";
import { startingDeck } from "../cards";
import { shuffleArray } from "../utils";
import { matchData } from "../stores";


let matchID;

let gameData;
matchData.subscribe((value) => {
    gameData = value;
})
// Takes in the ID of the match you want to listen to and a callback function
// Calls the callback every time the data in the match changes
export const startMatchListener = (id) => {
    matchID = id
    const matchesRef = ref(db, `matches/${id}`);
    onValue(matchesRef, (res) => {
        const data = res.val();
        matchData.set(data);
    });
} 

export const startGame = async () => {
    const matchesRef = ref(db, `matches/${matchID}`);

    for (const playerID in gameData.players) {
        let player = gameData.players[playerID];
        player.deck = shuffleArray(startingDeck);
        player.hand = [];
        // Build the player's hand
        for (let i = 0; i < 5; i++) {
            drawCard();
        }
    }
    gameData.started = true;
    gameData.playerTurn = playerID;

    await update(matchesRef, gameData);
    startTurn();
}

export const startTurn = async () => {
    const matchRef = ref(db, `matches/${matchID}`);
    const playerRef = child(matchRef, `players/${gameData.playerTurn}`);

    let playerData = {
        actions: 1,
        buys: 1,
        money: 0} 

    update(playerRef, playerData);
}

export const isGameStartable = () => {
    const playerCount = getPlayerCount(gameData);
    return playerCount >= 2 && !gameData.started;
}

export const drawCard = async () => {
    let player = getWhichTurn();
    const playerRef = ref(db, `matches/${matchID}/players/${gameData.playerTurn}`);
    if (player.deck.length === 0) {
        // Reshuffle discard pile into deck
        player.deck = shuffleArray(player.discard);
        player.discard = [];
    }

    player.hand.push(player.deck.pop());
    update(playerRef, player);
}

export const playCard = async (cardData) => {
    if (cardData.type === 'action') {
        cardData.action();
    }
    // dispatch('playCard', card)
}

const getWhichTurn = () => {
    return gameData.players[gameData.playerTurn];
}