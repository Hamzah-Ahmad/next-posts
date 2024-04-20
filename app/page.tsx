import Link from "next/link";

import Header from "./components/Header";
import ApiCallButton from "./components/ApiCallButton";

export default async function Home() {
  return (
    <main className="h-screen w-full">
      <Header />
      <div className="h-2/3 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-8">
        <Link href="/protected" className="text-xl underline">
          Go To Protected Page
        </Link>
        <ApiCallButton />
      </div>
    </main>
  );
}
