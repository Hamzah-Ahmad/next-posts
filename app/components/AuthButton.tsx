"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button
          className="text-white p-2 rounded-lg bg-neutral-950"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="text-white p-2 rounded-lg bg-neutral-950"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default AuthButton;
