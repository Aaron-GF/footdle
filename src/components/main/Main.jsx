import React from "react";
import Board from "@/components/main/Board";
import SearchBar from "@/components/main/SearchBar";

import getPlayers from "@/app/api/searchPlayers";

export default function Main() {
  const player = getPlayers("Gueye");

  const handlePlayerSelect = (e) => {
    e.preventDefault();
    getPlayers(player);
  };

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 px-2 my-2">
      <Board player={player}/>
      
        <SearchBar player={player} />
      
    </main>
  );
}
