import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXian9bVHmsERvFJ_pT_ib0AMwqhKDaVQ",
  authDomain: "teaminion-9190e.firebaseapp.com",
  databaseURL: "https://teaminion-9190e-default-rtdb.firebaseio.com",
  projectId: "teaminion-9190e",
  storageBucket: "teaminion-9190e.appspot.com",
  messagingSenderId: "141508828467",
  appId: "1:141508828467:web:df4be5e68550badd047246"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const db = getDatabase(app);
export const playerID = (await anonSignIn()).currentUser.uid;

async function anonSignIn() {
  try {
    await signInAnonymously(auth);
    console.log('Hello, player', auth.currentUser.uid);
    return auth;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
}