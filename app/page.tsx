import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-zinc-50">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">
          Dayflow
        </h1>
        <p className="text-xl text-zinc-400">
          Every workday, perfectly aligned.
        </p>
        <div className="flex gap-4 mt-8">
          <Link href="/login">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-full">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="border-violet-600 text-violet-500 hover:bg-violet-950 px-8 py-6 text-lg rounded-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}