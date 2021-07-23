import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./config/firebase";
import Button from "./components/Button";
import Channel from "./components/Channel";

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(true);
      else setUser(null);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return "Loading...";

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <>
          <header className="d-flex justify-content-between p-3">
            <h1 className="text-danger fs-2">Typi4ok for BodyaAndDen4ik</h1>
            <Button onClick={signOut}>SignOut</Button>
          </header>
          <Channel user={auth.currentUser} db={db} />
        </>
      ) : (
        <div className='d-flex w-100  justify-content-center'>
          <Button onClick={signInWithGoogle}>SignIn with Google</Button>
        </div>
      )}
    </div>
  );
}

export default App;
