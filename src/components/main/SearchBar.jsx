"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import data from "@/app/data/players.json";
import { normalizeString } from "@/lib/utils/string";

const playersData = data.playersData || [];

export default function SearchBar({ onPlayerSelect, inputRef }) {
  const [query, setQuery] = useState("");

  // filtra jugadores por busqueda
  const filteredPlayers =
    query.length > 2
      ? playersData.filter((player) =>
          normalizeString(player.Name).includes(normalizeString(query))
        )
      : [];

  // selecciona jugador
  const handleSelect = (player) => {
    if (onPlayerSelect) onPlayerSelect(player);
    setQuery("");
  };

  // evento tecla enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit
      if (filteredPlayers.length > 0) {
        handleSelect(filteredPlayers[0]); // selecciona la primera sugerencia
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-50">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-3 bg-color1 p-3 rounded-4xl w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-main cursor-pointer"
        >
          <circle cx="10" cy="7" r="4" />
          <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
          <circle cx="17" cy="17" r="3" />
          <path d="m21 21-1.9-1.9" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Busca el jugador..."
          className="w-full outline-none text-main font-bold"
        />
      </form>

      {/* Dropdown */}
      {query.length > 2 && (
        <div className="bg-main/80 rounded-xl shadow-lg max-h-60 overflow-y-auto scroll-thin">
          {filteredPlayers.length === 0 ? (
            <p className="p-3 text-bg font-bold text-sm">Sin resultados</p>
          ) : (
            filteredPlayers.map((player) => (
              <div
                key={player.ID}
                onClick={() => handleSelect(player)}
                className="flex items-center gap-3 hover:bg-main/60 transition duration-300 p-3 text-background font-bold cursor-pointer rounded-xl"
              >
                <span>{player.Name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
