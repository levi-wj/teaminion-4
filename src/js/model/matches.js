import { db, playerID } from "../firebase";
import { ref, onValue, set, update, push, get, orderByKey, equalTo, child } from "firebase/database";
import { getQuantities } from '../cards.js';

// create a new match
export const createMatch = async () => {
    const newMatchData = {
        started: false,
        cardsLeft: getQuantities(),
        players: {
            [playerID]: {
                nickname: localStorage.getItem('nickname'),
                isLeader: true,
            },
        },
    };

    const matchesRef = ref(db, 'matches');
    console.log('Creating match', newMatchData);
    await set(push(matchesRef), newMatchData);
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
export const joinMatch = async (matchID) => {
    const nickname = localStorage.getItem('nickname');
    const matchRef = ref(db, `matches/${matchID}`);
    const match = (await get(matchRef)).val();
    const playerCount = getPlayerCount(match);

    if (playerCount < 4 && !match.started) {
        console.log(`${playerID} is joining match`, match);
        const playerRef = child(matchRef, 'players');
        const players = {
            [playerID]: { nickname }
        };
        update(playerRef, players);
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
    const data = await get(matchesRef);
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

export const isPlayerLeader = (match) => {
    return match.players[playerID].isLeader === true;
}