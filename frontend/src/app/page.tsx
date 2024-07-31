import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

export default function Home() {

  const words = ["Mask", "Extract", "Encrypt"];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#122547]">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <FlipWords words={words} />your
        <br />
        files easily
      </h1>
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
