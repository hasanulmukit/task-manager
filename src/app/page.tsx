import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-8">
        <h1 className="text-3xl font-bold mb-8">TaskFlow_v2</h1>
        <Board />
      </div>
    </main>
  );
}