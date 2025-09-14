"use client";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onPlayerSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Debounce fetch
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 2) {
        try {
          setLoading(true);
          setError(null);

          const res = await fetch(`/api/players?q=${query}`);
          if (!res.ok) throw new Error("Error en la API");

          const data = await res.json();
          setResults(data.results);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Manejar click en jugador
  const handleSelect = (player) => {
    setQuery(player.name);
    setResults([]);
    if (onPlayerSelect) onPlayerSelect(player);
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-3 bg-color1 p-3 rounded-4xl w-full cursor-pointer"
      >
        <Search className="text-main" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca el jugador..."
          className="w-full outline-none text-main font-bold"
        />
      </form>

      {/* Dropdown */}
      {query.length > 2 && (loading || error || results.length > 0) && (
        <div
          ref={dropdownRef}
          className="bg-main/80 rounded-xl shadow-lg max-h-60 overflow-y-auto scroll-thin"
        >
          {loading && <p className="p-2 text-gray-500 text-sm">Buscando...</p>}
          {error && <p className="p-2 text-red-500 text-sm">{error}</p>}
          {!loading && !error && results.length === 0 && (
            <p className="p-2 text-gray-500 text-sm">Sin resultados</p>
          )}
          {results.map((player, i) => (
            <div
              key={i}
              onClick={() => handleSelect(player)}
              className="flex items-center gap-3 hover:bg-main/60 transition duration-300 p-3 text-bg font-bold cursor-pointer rounded-xl"
            >
              <span>{player.name}</span>
              {player.nationality && (
                <img
                  src={player.nationality}
                  alt="bandera pais"
                  className="h-4"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
