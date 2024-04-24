import Sidebar from "@/app/components/Sidebar"

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="flex gap-x-12">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
