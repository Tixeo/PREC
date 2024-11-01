import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const defaultPhotoUrl = "https://i.imgur.com/2lOwIQY.png";

const addUserToFirestore = async (user) => {
  const userDocRef = doc(db, "Users", user.uid);
  const userDoc = await getDoc(userDocRef);
  
  if (!userDoc.exists()) {
      const username = user.email.split('@')[0];
      const photoUrl = user.photoURL || defaultPhotoUrl;

      await setDoc(userDocRef, {
          email: user.email,
          name: username,
          photoUrl: photoUrl,
          admin: false,
          choiceList: [],
      });
  } else {
      console.log("L'utilisateur existe déjà dans Firestore.");
  }
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await addUserToFirestore(result.user);
  return result;
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await addUserToFirestore(result.user);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
