import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShiny, setShowShiny] = useState(false);

  useEffect(() => {
    axios
      .get(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!pokemon)
    return <p className="text-center mt-10">Pokémon introuvable.</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 max-w-full">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        &larr; Retour
      </Link>

      {/* Informations principales */}
      <div className="bg-white p-6 rounded-2xl shadow mx-auto max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {pokemon.name.fr}
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={showShiny ? pokemon.sprites.shiny : pokemon.sprites.regular}
              alt={pokemon.name.fr}
              className="w-40 h-40 object-contain"
            />
            <label className="flex items-center mt-2 text-sm gap-2 justify-center">
              <span className="text-black-700">Afficher en shiny</span>
              {/* Switch de Material-UI */}
              <Switch
                checked={showShiny}
                onChange={() => setShowShiny(!showShiny)}
                color="primary"
              />
            </label>
          </div>

          <div className="text-gray-700 text-lg space-y-2">
            <div className="flex gap-2 items-center">
              <strong className="text-gray-900">Type(s) :</strong>
              {pokemon.types.map((type) => (
                <div key={type.name} className="flex items-center gap-1">
                  <img src={type.image} alt={type.name} className="w-6 h-6" />
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
            <p>
              <strong className="text-gray-900">Taille :</strong>{" "}
              {pokemon.height}
            </p>
            <p>
              <strong className="text-gray-900">Poids :</strong>{" "}
              {pokemon.weight}
            </p>
            <p>
              <strong className="text-gray-900">PV :</strong> {pokemon.stats.hp}
            </p>
            <p>
              <strong className="text-gray-900">Attaque :</strong>{" "}
              {pokemon.stats.atk}
            </p>
            <p>
              <strong className="text-gray-900">Défense :</strong>{" "}
              {pokemon.stats.def}
            </p>
          </div>
        </div>
      </div>

      {/* Évolutions */}
      {pokemon.evolution?.next && (
        <div className="bg-white mt-6 p-6 rounded-2xl shadow mx-auto max-w-3xl w-full">
          <h3 className="text-2xl font-bold mb-4 text-center">Évolutions</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {pokemon.evolution.next.map((evo) => (
              <Link
                to={`/pokemon/${evo.pokedex_id}`}
                key={evo.pokedex_id}
                className="text-center hover:scale-105 transition-transform"
              >
                <img
                  src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${evo.pokedex_id}/regular.png`}
                  alt={evo.name}
                  className="w-24 h-24 mx-auto"
                />
                <p className="font-semibold">{evo.name}</p>
                <p className="text-sm text-gray-500">{evo.condition}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Résistances */}
      {pokemon.resistances && (
        <div className="bg-white mt-6 p-6 rounded-2xl shadow mx-auto max-w-3xl w-full">
          <h3 className="text-2xl font-bold mb-4 text-center">Résistances</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            {pokemon.resistances.map((res) => (
              <div
                key={res.name}
                className="bg-gray-100 rounded-xl p-3 shadow-sm"
              >
                <p className="font-semibold text-gray-600">{res.name}</p>
                <p className="text-sm text-red-600">
                  x{res.multiplier.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
