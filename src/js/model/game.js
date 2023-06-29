import { db, playerID } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import { getPlayerCount } from "./matches";

// Takes in the ID of the match you want to listen to and a callback function
// Calls the callback every time the data in the match changes
export const addMatchListener = (id, cb) => {
    const matchesRef = ref(db, `matches/${id}`);
    onValue(matchesRef, (res) => {
        const data = res.val();
        cb(data);
    });
} 

export const startGame = (id) => {
    const matchesRef = ref(db, `matches/${id}`);
    update(matchesRef, { started: true });
}

export const isGameStartable = (match) => {
    const playerCount = getPlayerCount(match);
    return playerCount >= 2 && !match.started;
}