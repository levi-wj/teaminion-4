import { db, playerID } from "../firebase";
import { ref, get, child, onValue, update, remove } from "firebase/database";
import { getPlayerCount } from "./matches";
import { cardList, startingDeck } from "../cards";
import { shuffleArray } from "../utils";
import { matchData } from "../stores";
import { draw } from "svelte/transition";



let matchID;
let gameData;
matchData.subscribe((value) => {
    gameData = value;
});

// Takes in the ID of the match you want to listen to and a callback function
// Calls the callback every time the data in the match changes
export const startGameListeners = (id) => {
    const matchesRef = ref(db, `matches/${id}`);

    matchID = id
    // Listener for when the match data changes in the DB
    // Updates the matchData store
    onValue(matchesRef, (res) => {
        const data = res.val();
        matchData.set(data);
    });
} 

export const startGame = async () => {
    const matchesRef = ref(db, `matches/${matchID}`);
    let updatedMatch = {};

    updatedMatch.started = true;
    updatedMatch.playerTurn = playerID;
    updatedMatch.players = gameData.players;

    // Give all the players their starting decks and hands
    for (const playerID in gameData.players) {
        let updatedPlayer = gameData.players[playerID];

        updatedPlayer.deck = shuffleArray(startingDeck);
        // Draw five cards into the player's hand
         drawCards(updatedPlayer, 5);

        updatedMatch.players[playerID] = updatedPlayer;
    }

    await update(matchesRef, updatedMatch);
    startTurn();
}

export const startTurn = () => {
    const matchRef = ref(db, `matches/${matchID}`);
    const playerRef = child(matchRef, `players/${gameData.playerTurn}`);

    const playerData = {
        actions: 1,
        buys: 1,
        money: 0,
    };
    const matchData = {
        phase: 'action',
        playerTurn: gameData.playerTurn,
        cardsInPlay: [],
    };

    update(matchRef, matchData);
    update(playerRef, playerData);
}

export const startBuyPhase = () => {
    const matchRef = ref(db, `matches/${matchID}`);
    const playerRef = ref(db, `matches/${matchID}/players/${gameData.playerTurn}`);
    let player = getWhichTurnPlayer();
    player.hand.forEach(cardID => {
        const card = cardList[cardID];
        if (card.type === 'treasure') {
            player.money += card.value;
        }
    });
    update(matchRef, { phase: 'buy'});
    update(playerRef, { money: player.money });
}

export const endTurn = () => {
    const playerRef = ref(db, `matches/${matchID}/players/${gameData.playerTurn}`);
    let player = getWhichTurnPlayer();

    if (!player.discard) {
        player.discard = [];
    }
    if (gameData.cardsInPlay) {
        // Discard played cards
        player.discard.push(...gameData.cardsInPlay);
    }
    if (player.hand.length > 0) {
        // Discard cards in hand
        player.discard.push(...player.hand);
    }

    // Drawn next hand
    player.hand = [];
    drawCards(player, 5);

    update(playerRef, player);

    // Start the turn for the next player
    gameData.playerTurn = getNextPlayerTurn();
    startTurn();
}

// Gets the player ID of the player whose turn it is next
const getNextPlayerTurn = () => {
    let playerCount = getPlayerCount(gameData);
    let playerIDs = Object.keys(gameData.players);
    let currentPlayerIndex = playerIDs.indexOf(gameData.playerTurn);

    return playerIDs[(currentPlayerIndex + 1) % playerCount];
}

export const isGameStartable = () => {
    const playerCount = getPlayerCount(gameData);
    return playerCount >= 2 && !gameData.started;
}

export const drawCards = (player, count) => {
    if (!player.hand) {
        player.hand = [];
    }
    if (!player.deck) {
        player.deck = [];
    }
    for (let i = 0; i < count; i++) {
        // If there are no cards to draw, reshuffle discard pile into deck
        if (player.deck) {
            if (player.deck.length === 0) {
                if (player.discard && player.discard.length > 0) {
                    // Reshuffle
                    player.deck = shuffleArray(player.discard);
                    player.discard = [];
                } else {
                    // No cards to reshuffle, stop trying to draw cards
                    break;
                }
            }
            player.hand.push(player.deck.pop());
        }
    }
}

export const drawCardsForCurrentPlayer = (count) => {
    let player = getWhichTurnPlayer();
    drawCards(player, count);
}

export const playCard = async (cardID, posInHand, cardData) => {
    const matchRef = ref(db, `matches/${matchID}`);
    let player = getWhichTurnPlayer();

    if (cardData.action !== undefined) {
        player.actions--;
        // Take the card out of the hand
        player.hand.splice(posInHand, 1);

        // Put the card onto the table
        if (!gameData.cardsInPlay) {
            gameData.cardsInPlay = [];
        }
        gameData.cardsInPlay.push(cardID);

        // Do the action specific to this card
        cardData.action();
    }

    update(matchRef, gameData);
}

const getWhichTurnPlayer = () => {
    console.log(gameData.players[gameData.playerTurn])
    return gameData.players[gameData.playerTurn];
}

// get one more action
export const addAction = () => {
    let action =gameData.players[gameData.playerTurn].actions++;
    console.log(gameData.players[gameData.playerTurn]);
    return action;
}

// get one more buy
export const addBuy = () => {
    let buy = gameData.players[gameData.playerTurn].buys++;
    console.log(gameData.players[gameData.playerTurn]);
    return buy;
}

// get one more money
export const addMoney = () => {
    let money = gameData.players[gameData.playerTurn].money++;
    return money;
}

// buy a card
export const buyCard = (cardID) => {
    let player = getWhichTurnPlayer();
    let card = cardList[cardID];
    if (!player.discard) {
        player.discard = [];
    }
    if (player.buys > 0) {
        if (player.money >= card.cost) {
            player.money -= card.cost;
            player.buys--;
            player.discard.push(cardID);
            gameData.cardsLeft[cardID]--;
            matchData.set(gameData);
        }
    }
}

export const merchantSkill = () => {
    let player = getWhichTurnPlayer();
    player.hand.forEach(element => {
        // silver
        if(element == 1){
            return gameData.players[gameData.playerTurn].money++;
        }else{
            return;
        }
    });
}

export const mineSkill = () => {
    let player = getWhichTurnPlayer();
    //copper -> silver
    let selectedCard;
    if(selectedCard == 0){
        return selectedCard = 1;
    }
    else if(selectedCard ==1){
        return selectedCard = 2;
    }else{
        return;
    }
}

export function leaveGame() {
    if (getPlayerCount(gameData) > 1) {
        const playerRef = ref(db, `matches/${matchID}/players/${gameData.playerTurn}`);
        remove(playerRef);
        
    } else {
        const matchRef = ref(db, `matches/${matchID}`);
        remove(matchRef);
    }
    window.location.href = "/";
}