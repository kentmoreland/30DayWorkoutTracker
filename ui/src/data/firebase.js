import firebase from 'firebase';
import 'firebase/firestore';
import config from '@/firebaseConfig';

firebase.initializeApp(config);

const fb = { dbase: firebase.firestore(), auth: firebase.auth() };
export default fb;
