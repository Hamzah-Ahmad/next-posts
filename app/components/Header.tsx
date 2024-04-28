import { getServerSession } from "next-auth";

import AuthButton from "./AuthButton";
import { authOptions } from "@/utils/authOptions";
import Link from "next/link";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-end md:justify-between pt-4 gap-3 items-center max-w-[1280px]  m-auto px-4">
      <Link href="/" className="text-2xl font-bold hidden md:block">Next Posts</Link>
      <AuthButton />
    </div>
  );
};

export default Header;
