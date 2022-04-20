// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
const { getFirestore } = require('firebase/firestore');
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from './firebaseConfigData';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
let db;
let storage;
let database;
const firebaseApp = async () => {
	const app = initializeApp(firebaseConfig);
	db = getFirestore(app);
	storage = getStorage(app);

	database = getDatabase(app);
};

export { firebaseApp, db, storage, database };
