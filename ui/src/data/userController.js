import fb from '@/data/firebase';

/**
 * Signin returns a user object if the login was successful
 * and an error object with a message property if unsuccessful.
 *
*/
const signin = (email, password) => fb.auth
  .signInWithEmailAndPassword(email, password).catch(e => e);

const userController = {
  signin,
};

export default userController;
