import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function useWhitelist() {
  const [error, setError] = useState("");

  const AddToWhiteList = async (email: string) => {
    try {
      await setDoc(doc(db, "whitelist", email), { email });
    } catch (err: any) {
      console.error("Cant add to whitelist", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return { AddToWhiteList, error };
}
