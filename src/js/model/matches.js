import { db, playerID } from "../firebase";
import { ref, onValue, set, update, push, get, orderByKey, equalTo, child } from "firebase/database";
import { getQuantities } from '../cards.js';

const matchData = {
    started: false,
    cardsLeft: getQuantities(),
    players: {
        [playerID]: {
            deck: {
                copper: 7,
                estate: 3,
            },
        },
    },
    playerTurn: playerID,
};

export const createMatch = async () => {
    const gamesRef = ref(db, 'matches');
    console.log('Creating match', matchData);
    await set(push(gamesRef), matchData);
    window.location.href = '/src/game.html';
}

export const addMatchListener = cb => {
    const gamesRef = ref(db, 'matches');
    onValue(gamesRef, (res) => {
        const data = res.val();
        cb(data);
    });
}

export const getOpenMatches = async () => {
    const gamesRef = ref(db, 'matches');
    const data = (await get(gamesRef)).val();
    return data;
}

export const joinMatch = async (matchID) => {
    const gamesRef = ref(db, 'matches');
    const matchRef = child(gamesRef, matchID);
    const match = (await get(matchRef)).val();
    const playerCount = getPlayerCount(match);
    if (playerCount < 4) {
        console.log(`${playerID} is joining match`, match);
        const playerRef = child(matchRef, 'players');
        const player = {
            [playerID]: {
                deck: {
                    copper: 7,
                    estate: 3,
                },
            },
        };
        update(playerRef, player);
        window.location.href = '/src/game.html';
        return true;
    } else {
        return false;
    }
}

export const getPlayerCount = (match) => {
    return Object.keys(match.players).length;
}

export const getCurrentMatchID = async () => {
    const gamesRef = ref(db, 'matches');
    const data = (await get(gamesRef)).val();
    const matches = Object.entries(data);
    matches.forEach(([id, match]) => {
        if (match.players && match.players[playerID]) {
            console.log('Player is in match', id);
            return id;
        }
    });
    return null;
}