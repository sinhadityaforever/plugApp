// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
const { getFirestore } = require('firebase/firestore');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCBwccanPlUrTq2Yev8xEi6bEa7yDL5Fj8',
	authDomain: 'plugapp-a1ceb.firebaseapp.com',
	projectId: 'plugapp-a1ceb',
	storageBucket: 'plugapp-a1ceb.appspot.com',
	messagingSenderId: '955257461424',
	appId: '1:955257461424:web:cc85fd9c20ac80e8e6f975'
};

// Initialize Firebase
let db;
const firebaseApp = async () => {
	const app = initializeApp(firebaseConfig);
	db = getFirestore(app);
};

export { firebaseApp, db };
