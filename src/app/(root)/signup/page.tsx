"use client";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.js";
import SignUpForm from "./SignUpForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const snapshot = await getDocs(collection(db, "whitelist"));
      const isWhitelisted = snapshot.docs.some(
        (doc) => doc.data().email.toLowerCase() === email.toLowerCase()
      );
      if (!isWhitelisted) {
        setError("This email is not authorized to sign up.");
        return;
      }
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredentials.user);
      alert("Go to your email and verify your account.");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-inter ml-[10%] mr-[10%] mt-[5%] mb-[10%]">
      <h2 className="font-bold text-2xl">Admin Sign Up</h2>
      <SignUpForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
        error={error}
      />
    </div>
  );
}
