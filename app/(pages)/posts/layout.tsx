import Sidebar from "@/app/components/Sidebar";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="mr-4 flex justify-end mb-10">
        <Link
          href="/new"
          className="bg-base-100 w-fit text-white p-2 rounded-md"
        >
          Create Post
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-x-12">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
