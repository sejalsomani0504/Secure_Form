import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">PDF Processing</h1>
      <div className="space-x-4">
        <Link href="/extract">
          <p className="px-4 py-2 bg-blue-500 text-white rounded">Extract</p>
        </Link>
        <Link href="/mask">
          <p className="px-4 py-2 bg-green-500 text-white rounded">Mask</p>
        </Link>
      </div>
    </main>
  );
}
