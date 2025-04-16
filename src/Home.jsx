import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Bienvenue
      </h1>

      <div className="flex gap-6">
        <Link
          to="/pokemon"
          className="px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
        >
          Pokémon
        </Link>
        <Link
          to="/pilotes"
          className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition"
        >
          Formula One
        </Link>
      </div>
    </div>
  );
}
