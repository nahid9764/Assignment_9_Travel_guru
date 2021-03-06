import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  firebase.initializeApp(firebaseConfig);
};

export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const isSignIn = {
        isLogin: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return isSignIn;
    })
    .catch((error) => console.log(error, error.message));
};

export const handleFacebookSignin = () => {
   const provider = new firebase.auth.FacebookAuthProvider();
  return firebase
     .auth()
     .signInWithPopup(provider)
     .then((res) => {
       const { displayName, email, photoURL } = res.user;
       const isSignIn = {
         isLogin: true,
         name: displayName,
         email: email,
         photo: photoURL,
         success: true,
       };
       return isSignIn;
     })
     .catch((error) => console.log(error, error.message));
}

export const handleSignOut = () => {
  console.log("Sign Out is clicked");
  return firebase
    .auth()
    .signOut()
    .then((result) => {
      const signedOut = {
        isLogin: false,
        name: "",
        email: "",
        photo: "",
      };
      return signedOut;
    })
    .catch((err) => console.log(err));
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
       const { displayName, email, photoURL } = res.user;
       const isSignIn = {
         isLogin: true,
         name: displayName,
         email: email,
         photo: photoURL,
         success: true,
      };
       updateUserName(name);
       return isSignIn;
     })

    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const isSignIn = {
        isLogin: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return isSignIn;
    })   
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  var user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("user name update successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};
