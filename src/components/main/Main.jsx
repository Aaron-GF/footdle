"use client";
import { useState, useRef } from "react";
import Board from "@/components/main/Board";
import SearchBar from "@/components/main/SearchBar";
import { normalizeString } from "@/lib/utils/string";

export default function Main() {
  const [selectedCell, setSelectedCell] = useState(null); // selected cell index (0..15) or null
  const [players, setPlayers] = useState({}); // players on board: { [index]: playerObject }
  const [teamsMap, setTeamsMap] = useState({}); // store teams for every cell

  const inputRef = useRef(null);

  // click on board cell -> toggle selection
  const handleCellSelect = (index) => {
    setSelectedCell((prev) => (prev === index ? null : index));
    if(inputRef?.current) {
      inputRef.current.focus();
    }
  };

  // when serchbar return player
  const handlePlayerSelect = (player) => {
    if (selectedCell === null) {
      window.alert("Selecciona una casilla antes de asignar un jugador");
      return;
    }

    const idx = selectedCell;

    // Determine row team: find which team in first row aligns with this cell
    const firstRowIndices = [1, 2, 3];
    const rowTeamIndex = firstRowIndices[(idx % 4) - 1]; // map column to first row
    const rowTeam = teamsMap[rowTeamIndex];

    // Determine column team: find which team in first column aligns with this cell
    const firstColIndices = [4, 8, 12];
    const colTeamIndex = firstColIndices[Math.floor(idx / 4) - 1]; // map row to first column
    const colTeam = teamsMap[colTeamIndex];

    // Normalize
    const playerTeamsNormalized = (player.Teams || []).map(normalizeString);
    const rowTeamNorm = rowTeam ? normalizeString(rowTeam) : null;
    const colTeamNorm = colTeam ? normalizeString(colTeam) : null;

    // Validate player belongs to both teams if needed
    if (
      (rowTeamNorm && !playerTeamsNormalized.includes(rowTeamNorm)) ||
      (colTeamNorm && !playerTeamsNormalized.includes(colTeamNorm))
    ) {
      window.alert("Jugador incorrecto para esta casilla");
      return;
    }

    // Assign player
    setPlayers((prev) => ({ ...prev, [selectedCell]: player }));
    setSelectedCell(null);
  };

  const handleReset = () => {
    setPlayers({});
    setSelectedCell(null);
  };

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 px-2 my-2">
      <Board
        players={players}
        selectedCell={selectedCell}
        onCellSelect={handleCellSelect}
        onReset={handleReset}
        setTeamsMap={setTeamsMap}
      />
      <SearchBar onPlayerSelect={handlePlayerSelect} inputRef={inputRef} />
    </main>
  );
}
