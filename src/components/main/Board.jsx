"use client";
import { useState, useEffect } from "react";
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
                aria-label="Reiniciar"
                title="Reiniciar"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="size-18 flex items-center justify-center bg-background text-main rounded-md hover:bg-color1/80 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>
            )}

            {cell.type === "team" && (
              <img
                src={cell.content}
                alt="Team"
                title={cell.teamName}
                className="size-full p-2 sm:p-4 object-contain"
              />
            )}

            {cell.type === "player" && (
              <div className="w-full h-full flex items-center justify-center bg-background rounded-md p-1">
                <span className="text-xs md:text-base font-bold text-center text-main">
                  {cell.name}
                </span>
              </div>
            )}

            {cell.type === "placeholder" && (
              <div className="w-full h-full flex items-center justify-center bg-green-700 rounded-md p-1 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--main)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
