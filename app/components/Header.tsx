import { getServerSession } from "next-auth";

import AuthButton from "./AuthButton";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center md:justify-end h-12 mr-0 md:mr-14 pt-4 gap-3 items-center">
      <div className="text-base md:text-xl">
        Welcome {session ? session.user?.name : "Guest"}
      </div>
      <AuthButton />
    </div>
  );
};

export default Header;
