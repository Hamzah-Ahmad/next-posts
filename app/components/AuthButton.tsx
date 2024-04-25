"use client";
import {
  ArrowRightCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <div className="flex items-center gap-x-4">
          <p className="text-sm">Signed in as {session.user?.name}</p>
          <button onClick={() => signOut()}>
            <ArrowRightEndOnRectangleIcon className="h-6" />
          </button>
        </div>
      ) : (
        <button
          className="text-white p-2 rounded-lg bg-base-100"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default AuthButton;
