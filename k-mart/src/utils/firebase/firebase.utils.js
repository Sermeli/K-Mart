import { initializeApp } from 'firebase/app';
import {getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider 
    } from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'   
const firebaseConfig = {
    apiKey: "AIzaSyBxGR2EUYJrTuV_D2NQLMlgF7UzbztPzg8",
    authDomain: "k-mart-db.firebaseapp.com",
    projectId: "k-mart-db",
    storageBucket: "k-mart-db.appspot.com",
    messagingSenderId: "73613717883",
    appId: "1:73613717883:web:d28e66893727c2100bcdde"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }        
    }
    
    return userDocRef;
  }
 