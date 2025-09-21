"use client";
import { useState, useRef } from "react";
import Board from "@/components/main/Board";
import SearchBar from "@/components/main/SearchBar";
import { normalizeString } from "@/lib/utils/string";
import HelpOptions from "./HelpOptions";

export default function Main() {
  const [selectedCell, setSelectedCell] = useState(null); // selected cell index (0..15) or null
  const [players, setPlayers] = useState({}); // players on board: { [index]: playerObject }
  const [teamsMap, setTeamsMap] = useState({}); // store teams for every cell

  const inputRef = useRef(null);

  // click on board cell -> toggle selection
  const handleCellSelect = (index) => {
    setSelectedCell((prev) => (prev === index ? null : index));
    inputRef.current?.focus();
  };

  // when serchbar return player
  const handlePlayerSelect = (player) => {
  if (selectedCell === null) {
    window.alert("Selecciona una casilla antes de asignar un jugador");
    return;
  }

  const { rowTeam, colTeam } = teamsMap[selectedCell] || {};
  if (!rowTeam || !colTeam) {
    window.alert("Casilla sin equipos asignados");
    return;
  }

  const playerTeams = (player.Teams || []).map(normalizeString);
  if (
    !playerTeams.includes(normalizeString(rowTeam)) ||
    !playerTeams.includes(normalizeString(colTeam))
  ) {
    window.alert("Jugador incorrecto para esta casilla");
    return;
  }

  setPlayers((prev) => ({ ...prev, [selectedCell]: player }));
  setSelectedCell(null);
};

  const handleReset = () => {
    setPlayers({});
    setSelectedCell(null);
  };

  return (
    <main className="flex flex-col lg:flex-row justify-center items-center gap-10 md:gap-20 px-2 my-10 lg:mb-20">
      <Board
        players={players}
        selectedCell={selectedCell}
        onCellSelect={handleCellSelect}
        onReset={handleReset}
        setTeamsMap={setTeamsMap}
      />
      <SearchBar onPlayerSelect={handlePlayerSelect} inputRef={inputRef} />
      <HelpOptions
        selectedCell={selectedCell}
        teamsMap={teamsMap}
      />
    </main>
  );
}
