import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const FirebaseAuth = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [userInfo, setUserInfo] = useState("");

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(auth.currentUser, { displayName: "" });

      setUserInfo(user);

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        email: values.email,
        password: values.password,
        id: user.user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserInfo(currentUser);
      } else {
        setUserInfo("");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    setUserInfo(cred);
    console.log("login success");
  };
  return (
    <>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter the email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter the password"
          onChange={handleInputChange}
        />
        <button onClick={handleCreateUser}>Sign up</button>

        <div>
          <span>{userInfo?.email}</span>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </div>

      <div className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Enter the email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter the password"
          onChange={handleInputChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default FirebaseAuth;
