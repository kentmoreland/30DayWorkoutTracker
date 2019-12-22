import firebase from 'firebase';
import config from '@/firebaseConfig';

const db = firebase.initializeApp(config);
export default db;
