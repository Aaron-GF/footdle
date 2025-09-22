"use client";
import { useState, useEffect } from "react";
import { Shirt, RefreshCw } from "lucide-react";
import teamsData from "@/app/data/teams";
import { shuffleArray } from "@/lib/utils/array";

export default function Board({
  players = {},
  selectedCell = null,
  onCellSelect,
  onReset,
  setTeamsMap,
}) {
  const [teams, setTeams] = useState([]);

  // empereja de manera aleatoria los equipos en el cliente, evita errores en renderizado
  useEffect(() => {
    setTeams(shuffleArray(teamsData));
  }, []);

  // genera el tablero
  const board = Array(16).fill(null);

  // Primer casilla → reinicio
  board[0] = { type: "reset" };

  // Primera fila → escudos de equipos
  if (teams.length >= 3) {
    [1, 2, 3].forEach(
      (i, idx) =>
        (board[i] = {
          type: "team",
          content: teams[idx].logo,
          teamName: teams[idx].name,
        })
    );
  }

  // Primera columna → escudos de equipos (evita la esquina del boton de reinicio)
  if (teams.length >= 6) {
    [4, 8, 12].forEach(
      (i, idx) =>
        (board[i] = {
          type: "team",
          content: teams[idx + 3].logo,
          teamName: teams[idx + 3].name,
        })
    );
  }

  // Otros → jugadores de los equipos o icono por defecto
  for (let i = 0; i < 16; i++) {
    if (!board[i]) {
      if (players[i]) {
        board[i] = {
          type: "player",
          name: players[i].Name,
          teams: players[i].Teams,
        };
      } else {
        board[i] = { type: "placeholder" };
      }
    }
  }

  useEffect(() => {
    if (!teams.length || typeof setTeamsMap !== "function") return;
    const map = {};

    // cabeceras
    [1, 2, 3].forEach((i, idx) => {
      if (teams[idx]) map[i] = teams[idx].name;
    });
    [4, 8, 12].forEach((i, idx) => {
      if (teams[idx + 3]) map[i] = teams[idx + 3].name;
    });

    // celdas jugables
    for (let i = 5; i < 16; i++) {
      if ([4, 8, 12].includes(i)) continue; // saltar cabeceras
      const colIndex = (i % 4) - 1; 
      const rowIndex = Math.floor(i / 4) - 1; 
      const rowTeam = teams[colIndex]?.name;
      const colTeam = teams[rowIndex + 3]?.name;
      if (rowTeam && colTeam) {
        map[i] = { rowTeam, colTeam };
      }
    }

    setTeamsMap(map);
  }, [teams, setTeamsMap]);

  // manejo de eventos reinicio
  const handleReset = () => {
    setTeams(shuffleArray(teams));
    onCellSelect?.(null); // deselecciona celda
    onReset?.(); 
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main xs:w-9/10 max-w-lg rounded-md gap-1 p-2">
      {board.map((cell, i) => {
        const isSelected = selectedCell === i;

        // agrega clases visuales cuando la celda está seleccionada
        const wrapperClass =
          "aspect-square flex items-center justify-center transition relative " +
          (isSelected ? "opacity-60 rounded-md" : "");

        // solo casillas placeholder/player responden al click para seleccionar
        const clickable = cell.type === "placeholder" || cell.type === "player";

        return (
          <div
            key={i}
            className={wrapperClass}
            onClick={() => {
              if (cell.type === "reset") return;
              if (clickable && typeof onCellSelect === "function")
                onCellSelect(i);
            }}
            role="button"
            aria-pressed={isSelected}
            aria-label={`Casilla ${i}`}
          >
            {cell.type === "reset" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="w-6/10 h-6/10 flex items-center justify-center bg-bg text-main rounded-md hover:bg-color1/80 transition cursor-pointer"
              >
                <RefreshCw className="size-5/10" />
              </button>
            )}

            {cell.type === "team" && (
              <img
                src={cell.content}
                alt="Team"
                className="size-full p-2 sm:p-4 object-contain"
              />
            )}

            {cell.type === "player" && (
              <div className="w-full h-full flex items-center justify-center bg-bg rounded-md p-1">
                <span className="text-xs md:text-base font-bold text-center text-main">
                  {cell.name}
                </span>
              </div>
            )}

            {cell.type === "placeholder" && (
              <Shirt className="size-full bg-green-700 text-main/40 cursor-pointer p-2 md:p-4 hover:opacity-60 rounded-md transition duration-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
