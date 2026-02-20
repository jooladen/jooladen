import { CharCounter } from "@/components/CharCounter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">jooladen</h1>
      <CharCounter />
    </main>
  );
}
