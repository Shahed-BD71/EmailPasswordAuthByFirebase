/* eslint-disable default-case */
import React, {useState, useEffect} from 'react';
import firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import './Login.css';
import LoginForm from '../LoginForm/LoginForm';
import LogOut from './LogOut';


//  const initializeLoginFramework = () => {
//    if (firebase.apps.length === 0) {
//      firebase.initializeApp(firebaseConfig);
//    }
//  };


   firebase.initializeApp(firebaseConfig);
const Login = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
 

 const clearInputs = () => {
   setEmail("");
   setPassword("");
 }

 const clearErrors = () => {
   setEmailError("");
   setPasswordError("");
 }

 const handleLogIn = () => {
    clearErrors();
    firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .catch((error) => {
       switch (error.code) {
         case "auth/invalid-email":
         case "auth/user-disabled":
         case "auth/user-not-found":
           setEmailError(error.message);
           break;
         case "auth/wrong-password":
           setPasswordError(error.message);
           break;
       }
     });
  };
  
 const handleSignUp = () => {
     clearErrors();
     firebase
       .auth()
       .createUserWithEmailAndPassword(email, password)
       .catch((error) => {
         switch (error.code) {
           case "auth/email-already-in-use":
           case "auth/invalid-email":
             setEmailError(error.message);
             break;
           case "auth/weak-password":
             setPasswordError(error.message);
             break;
         }
       });
   };

 const handleLogOut = () => {
     firebase
      .auth()
      .signOut();
   };
 const authListener = () => {
     firebase
     .auth()
     .onAuthStateChanged((user) => {
       if (user) {
         clearInputs();
         setUser(user)
       }else{
         setUser("");     
       }
     });
 };

  useEffect ( () => {
    authListener();
 }, [])

  return (
    <div>
      {user ? (
        <LogOut handleLogOut={handleLogOut}></LogOut>
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          handleLogIn={handleLogIn}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        ></LoginForm>
      )}
    </div>
  );
};

export default Login;