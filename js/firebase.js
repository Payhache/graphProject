// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref,push} from "firebase/database";
import *  as ENV from "../env";

const firebaseConfig = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DATABASE_URL,
    projectId: ENV.FIREBASE_PROJECT_ID,
    storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.FIREBASE_APP_ID,
    measurementId: ENV.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const resultsRef = ref(database, 'calc/toxicity');


export function saveToxicityResult(result) {
    push(resultsRef, result);
}
