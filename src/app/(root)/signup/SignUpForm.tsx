import React from "react";
import { Button } from "@/components/ui/button";

interface SignUpFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSignUp,
  error,
}) => (
  <form
    onSubmit={handleSignUp}
    className="flex flex-col items-center justify-center space-y-4 w-[30rem] p-6 bg-pink-50 rounded-xl shadow-lg"
  >
    <h2 className="text-2xl font-semibold text-pink-600">Create Account</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
    />

    <Button
      type="submit"
      className="w-full bg-pink-400 text-black font-medium py-2 rounded-lg hover:bg-pink-500 transition"
    >
      Sign Up
    </Button>

    {error && <p className="text-red-500 text-sm">{error}</p>}
  </form>
);

export default SignUpForm;
