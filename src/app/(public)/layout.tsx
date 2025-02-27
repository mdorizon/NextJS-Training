import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="container mx-auto flex justify-center gap-4 py-4">
        <Link href="/">Home</Link>
        <Link href="/classrooms">Classrooms</Link>
      </nav>

      {children}
    </div>
  );
}
