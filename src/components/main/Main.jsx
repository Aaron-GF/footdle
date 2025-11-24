"use client";
import { useState, useRef } from "react";
import SearchBar from "@/components/main/SearchBar";
import HelpOptions from "@/components/main/HelpOptions";
import { normalizeString } from "@/lib/utils/string";
import WinGame from "@/components/main/WinGame";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export default function Main() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [players, setPlayers] = useState({}); // guarda los jugadores del tablero: { [index]: playerObject }
  const [teamsMap, setTeamsMap] = useState({}); // guarda equipos para cada celda

  const inputRef = useRef(null);

  // Hook para navegación con teclado
  useKeyboardNavigation(selectedCell, setSelectedCell);

  // maneja el click de la casilla que se selecciona
  const handleCellSelect = (index) => {
    setSelectedCell((prev) => (prev === index ? null : index));
    inputRef.current?.focus();
  };

  // aviso para tener casilla seleccionada antes de colocar jugador
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
      <div className="flex flex-col items-center gap-4">
        <WinGame
          players={players}
          selectedCell={selectedCell}
          onCellSelect={handleCellSelect}
          onReset={handleReset}
          setTeamsMap={setTeamsMap}
        />
        <HelpOptions selectedCell={selectedCell} teamsMap={teamsMap} />
      </div>
      <SearchBar onPlayerSelect={handlePlayerSelect} inputRef={inputRef} />
    </main>
  );
}
