import Sidebar from "@/app/components/Sidebar"

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
