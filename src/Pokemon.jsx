import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // Utilisation de l'API avec pagination (supposons qu'elle renvoie des pages)
        const response = await axios.get(
          `https://tyradex.vercel.app/api/v1/pokemon?page=${currentPage}&limit=20`
        );
        setPokemons(response.data);
        setTotalPages(Math.ceil(response.headers["x-total-count"] / 20)); // Calcul du nombre total de pages (20 par page)
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 max-w-full">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
        Pokédex
      </h1>

      {loading ? (
        <p className="text-center text-lg">Chargement...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full">
            {pokemons.map((pokemon) => (
              <Link
                to={`/pokemon/${pokemon.pokedex_id}`}
                key={pokemon.pokedex_id}
                className="bg-white rounded-2xl shadow p-4 flex flex-col items-center transition-transform hover:scale-105"
              >
                <img
                  src={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                  className="w-20 h-20 object-contain"
                />
                <p className="mt-2 font-semibold text-gray-800 text-center">
                  {pokemon.name.fr}
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Précédent
            </button>
            <span className="flex items-center text-lg">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
