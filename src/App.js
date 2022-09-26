import "./App.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import initializeAuth from "./Firebase/Firebase.init";
import { useState } from "react";

initializeAuth();
const GoogleProvider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let submitHandler = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        console.log(result.user);
        let reg = {
          name: displayName,
          email: email,
          image: photoURL,
        };
        setData(reg);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const cancelHandler = () => {
    signOut(auth).then(() => {
      setData({});
    });
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // console.log("done");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const users = result.user;
        console.log(users);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
    console.log(email, password);
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="register">
        <h2 className="header">Signup now!</h2>
        <form onSubmit={handleSubmit} action="#">
          <label htmlFor="">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email...."
            onBlur={emailChange}
            required
          />
          <br />
          <label htmlFor="">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password...."
            onBlur={passChange}
            required
          />
          <br />
          <input className="btn" type="submit" value="Register" />
        </form>

        {/* <p> {email} </p>
        <p>{password}</p> */}
      </div>
      <br /> <br />
      =============================
      <br /> <br />
      <button onClick={submitHandler}>Google Sign in</button>
      <button onClick={cancelHandler}>Google Sign Out</button>
      {data.email && (
        <div>
          <h2>Name: {data.name}</h2>
          <h2>Email: {data.email}</h2>
          <img src={data.image} alt="user-img" />
        </div>
      )}
    </div>
  );
}

export default App;
