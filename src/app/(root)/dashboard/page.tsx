"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { auth } from "../../../firebase";
import ProtectedRoute from "../../../components/ProtectedRoutes";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [media, setMedia] = useState("");

  const AddToWhiteList = async () => {
    try {
      await setDoc(doc(db, "whitelist", email), {
        email: email,
      });
    } catch (err: any) {
      console.error("Cant add to whitelist", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="font-inter ml-[10%] mr-[10%] mt-[5%] mb-[10%] w-fit flex flex-col gap-y-10">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <div className="flex flex-col gap-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded-sm"
          />
          <Button onClick={AddToWhiteList} className="w-fit">
            Add Email to Whitelist
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button onClick={() => router.push('/dashboard/create-event')}>Create New Event</Button>
        </div>

        <Button onClick={() => auth.signOut()} className="w-fit">
          Sign out
        </Button>
      </div>
    </ProtectedRoute>
  );
}
