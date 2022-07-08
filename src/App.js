import "./App.css";
import app from "./firebase.init";

import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleSingOut}>Sing Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSingIn}>Google Sing in</button>
          <button onClick={handleGithubSingIn}>Github Sing in</button>
        </>
      )}

      <h1>Name: {user.displayName}</h1>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
