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

// create a new match
export const createMatch = async () => {
    const matchesRef = ref(db, 'matches');
    console.log('Creating match', matchData);
    await set(push(matchesRef), matchData);
    window.location.href = '/src/game.html';
}

// listens to existing matches
// if existing match data changes, pass match data to callback function
export const addMatchListener = cb => {
    const matchesRef = ref(db, 'matches');
    onValue(matchesRef, (res) => {
        const data = res.val();
        cb(data);
    });
}

// returns active matches in the database
// TODO: this will grab all joinable matches from the db
export const getOpenMatches = async () => {
    const matchesRef = ref(db, 'matches');
    const data = (await get(matchesRef)).val();
    return data;
}

// insert a player's id into a match
// initializes player's deck
export const joinMatch = async (matchID) => {
    const matchesRef = ref(db, 'matches');
    const matchRef = child(matchesRef, matchID);
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

// get number of players in a match
export const getPlayerCount = (match) => {
    return Object.keys(match.players).length;
}

// if a player's id already exists in a match, direct them to that match
// make all other matches unavailable
export const getCurrentMatchID = async () => {
    const matchesRef = ref(db, 'matches');
    const data = await get(matchesRef)
    const matches = data.val();
    for (const matchID in matches) {
        const match = matches[matchID];
        if (match.players && match.players[playerID]) {
            console.log('Player is in match', matchID);
            return matchID;
        }
    }
    return null;
}