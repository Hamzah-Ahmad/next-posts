import { getServerSession } from "next-auth";

import AuthButton from "./AuthButton";
import { authOptions } from "@/utils/authOptions";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-end pt-4 gap-3 items-center max-w-[1280px]  m-auto px-4">
      <AuthButton />
    </div>
  );
};

export default Header;
