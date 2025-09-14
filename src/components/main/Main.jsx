"use client";
import { useState } from "react";
import Board from "@/components/main/Board";
import SearchBar from "@/components/main/SearchBar";

export default function Main() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 px-2 my-2">
      <Board player={selectedPlayer} />
      <SearchBar onPlayerSelect={handlePlayerSelect} />
    </main>
  );
}
