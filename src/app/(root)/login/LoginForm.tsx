import React from "react";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  router: any;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  error,
  router,
}) => (
  <form
    onSubmit={handleLogin}
    className="flex flex-col items-center justify-center space-y-5 w-[30rem] p-6 bg-pink-50 rounded-xl shadow-md"
  >
    <h2 className="text-2xl font-semibold text-pink-600">Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-pink-400 transition"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-pink-400 transition"
    />

    <Button
      type="submit"
      className="w-full bg-pink-600 text-black font-medium py-3 rounded-lg hover:bg-pink-700 transition"
    >
      Login
    </Button>

    <p
      className="text-xs underline text-center cursor-pointer text-pink-600"
      onClick={() => router.push("/forgetPassword")}
    >
      Forget Password?
    </p>

    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
  </form>
);

export default LoginForm;
