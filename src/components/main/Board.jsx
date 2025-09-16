"use client";
import { useState, useEffect } from "react";
import { Shirt, RefreshCw } from "lucide-react";
import teams from "@/app/data/teams";
import { shuffleArray } from "@/lib/utils/array";

export default function Board({
  boardPlayers = {},
  selectedCell = null,
  onCellSelect, 
  onReset
}) {
  const [boardTeams, setBoardTeams] = useState([]);

  // shuffle teams only on client, avoid error on render
  useEffect(() => {
    setBoardTeams(shuffleArray(teams));
  }, []);

  // generate board
  const board = Array(16).fill(null);

  // First square → reset
  board[0] = { type: "reset" };

  // First row → shields
  if (boardTeams.length >= 3) {
    [1, 2, 3].forEach(
      (i, idx) => (board[i] = { type: "team", content: boardTeams[idx].logo })
    );
  }

  // First column → shields (avoid first logo corner)
  if (boardTeams.length >= 6) {
    [4, 8, 12].forEach(
      (i, idx) =>
        (board[i] = { type: "team", content: boardTeams[idx + 3].logo })
    );
  }

  // Others → players from boardPlayers or placeholders
  for (let i = 0; i < 16; i++) {
    if (!board[i]) {
      if (boardPlayers[i]) {
        board[i] = {
          type: "player",
          name: boardPlayers[i].Name,
          teams: boardPlayers[i].Teams,
        };
      } else {
        board[i] = { type: "placeholder" };
      }
    }
  }

  // reset handler event
  const handleReset = () => {
    setBoardTeams(shuffleArray(teams));
    if (typeof onCellSelect === "function") onCellSelect(null); // deselect cell
    if (typeof onReset === "function") onReset(); // clear players on parent
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main w-full max-w-md rounded-xl gap-2 p-2">
      {board.map((cell, i) => {
        // is this cell selected?
        const isSelected = selectedCell === i;

        // agregar clases visuales cuando está seleccionada
        const wrapperClass =
          "aspect-square flex items-center justify-center transition relative " +
          (isSelected ? "ring-4 ring-offset-2 ring-yellow-300" : "");

        // solo casillas placeholder/player responderán al click para seleccionar
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
                className="w-6/10 h-6/10 flex items-center justify-center bg-bg text-main rounded-2xl hover:bg-color1/80 transition cursor-pointer"
              >
                <RefreshCw className="size-5/10" />
              </button>
            )}

            {cell.type === "team" && (
              <img
                src={cell.content}
                alt="Team"
                className="size-full p-1 md:p-4 object-contain"
              />
            )}

            {cell.type === "player" && (
              <div className="w-full h-full flex items-center justify-center bg-color1 rounded-2xl p-1">
                <span className="text-sm font-bold text-bg text-center">
                  {cell.name}
                </span>
              </div>
            )}

            {cell.type === "placeholder" && (
              <Shirt className="size-full text-color2/30 cursor-pointer p-1 md:p-4 hover:bg-color1/20 rounded-2xl transition duration-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
