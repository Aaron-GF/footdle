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

  // shuffle teams only on client, avoid error on render
  useEffect(() => {
    setTeams(shuffleArray(teamsData));
  }, []);

  // generate board
  const board = Array(16).fill(null);

  // First square → reset
  board[0] = { type: "reset" };

  // First row → shields
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

  // First column → shields (avoid first logo corner)
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

  // Others → players from boardPlayers or placeholders
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
    [1, 2, 3].forEach((i, idx) => {
      if (teams[idx]) map[i] = teams[idx].name;
    });
    [4, 8, 12].forEach((i, idx) => {
      if (teams[idx + 3]) map[i] = teams[idx + 3].name;
    });
    setTeamsMap(map);
  }, [teams, setTeamsMap]);

  // reset handler event
  const handleReset = () => {
    setTeams(shuffleArray(teams));
    if (typeof onCellSelect === "function") onCellSelect(null); // deselect cell
    if (typeof onReset === "function") onReset(); // clear players on parent
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main w-full max-w-md rounded-md gap-1 p-2">
      {board.map((cell, i) => {
        // is this cell selected?
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
                <span className="text-xs md:text-md font-bold text-center text-main">
                  {cell.name}
                </span>
              </div>
            )}

            {cell.type === "placeholder" && (
              <Shirt className="size-full bg-green-700 text-main/40 cursor-pointer p-2 sm:p-4 hover:bg-color1/20 rounded-md transition duration-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
