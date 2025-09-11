"use client";
import { useState } from "react";
import { Search } from "lucide-react";

import { use } from "react";

export default function SearchBar({ onPlayerSelect, player }) {
  const playerData = use(player);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center justify-center gap-3 bg-color1 p-3 rounded-4xl w-9/10 max-w-sm cursor-pointer mb-auto"
      >
        <Search className="text-main" />
        <input
          type="search"
          className="w-full outline-none text-main font-bold"
          placeholder="Busca el jugador..."
        />
      </form>
      <ul className="bg-main/80 hover:bg-main/60 transition duration-300 w-8/10 p-3 text-bg font-bold cursor-pointer rounded-xl">
        {playerData && (
          <li className="flex gap-2 items-center">
            {playerData[0].name}{" "}
            <img src={playerData[0].nationality} className="h-4" />
          </li>
        )}
      </ul>
    </div>
  );
}
