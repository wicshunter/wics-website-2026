import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";

interface LoggedInMessageProps {
  currentUser: any;
  auth: any;
  setCurrentUser: (user: any) => void;
  goToDashboard: () => void;
}

const LoggedInMessage: React.FC<LoggedInMessageProps> = ({
  currentUser,
  auth,
  setCurrentUser,
  goToDashboard,
}) => (
  <div className="flex flex-col items-center space-y-4 w-[30rem] p-6 bg-green-50 rounded-xl shadow-md text-center">
    <p className="text-green-700">
      You are already logged in as <span className="font-semibold">{currentUser.email}</span>.
    </p>

    <div className="flex gap-4 w-full justify-center">
      <Button
        className="bg-pink-600 text-black font-medium py-2 rounded-lg hover:bg-pink-700 transition w-1/2"
        onClick={async () => {
          await signOut(auth);
          setCurrentUser(null);
        }}
      >
        Logout
      </Button>

      <Button
        className="bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition w-1/2"
        onClick={goToDashboard}
      >
        Go to Dashboard
      </Button>
    </div>
  </div>
);

export default LoggedInMessage;
