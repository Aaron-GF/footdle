"use client";
import { useState } from "react";
import Board from "@/components/main/Board";
import SearchBar from "@/components/main/SearchBar";

export default function Main() {
  // selected cell index (0..15) or null
  const [selectedCell, setSelectedCell] = useState(null);

  // players on board: { [index]: playerObject }
  const [boardPlayers, setBoardPlayers] = useState({});

  // click on board cell -> toggle selection
  const handleCellSelect = (index) => {
    setSelectedCell((prev) => (prev === index ? null : index));
  };

  // when serchbar return player
  const handlePlayerSelect = (player) => {
    if (selectedCell === null) {
      window.alert("Selecciona una casilla antes de asignar un jugador");
      return;
    }

    // insert/replace player on cell selected
    setBoardPlayers((prev) => ({ ...prev, [selectedCell]: player }));

    // clear selection
    setSelectedCell(null);
  };

  const handleReset = () => {
    setBoardPlayers({});
    setSelectedCell(null);
  }

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 px-2 my-2">
      <Board
        boardPlayers={boardPlayers}
        selectedCell={selectedCell}
        onCellSelect={handleCellSelect}
        onReset={handleReset}
      />
      <SearchBar onPlayerSelect={handlePlayerSelect} />
    </main>
  );
}
