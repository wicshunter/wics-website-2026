"use client";

import { FormEvent, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase";
import LoginForm from "./LoginForm";
import LoggedInMessage from "./LoggedInMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      await currentUser.reload();

      if (currentUser && currentUser.emailVerified) {
        router.push("/dashboard");
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {currentUser ? (
        <div className="flex flex-col items-center gap-4">
          <LoggedInMessage
            currentUser={currentUser}
            auth={auth}
            setCurrentUser={setCurrentUser}
            goToDashboard={goToDashboard}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error={error}
            router={router}
          />
        </div>
      )}
    </div>
  );
}
