"use client";
import { useState, useEffect } from "react";
import { Shirt, RefreshCw } from "lucide-react";
import teams from "@/app/data/teams";
import { shuffleArray } from "@/lib/utils/array";

export default function Board({ player }) {
  const [boardTeams, setBoardTeams] = useState([]);

  // shuffle teams only on client
  useEffect(() => {
    setBoardTeams(shuffleArray(teams));
  }, []);

  // generate board
  const board = Array(16).fill(null);

  // First square → logo
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

  // Others → players or placeholders
  for (let i = 0; i < 16; i++) {
    if (!board[i]) {
      board[i] =
        player && player[0]
          ? { type: "player", content: player[0].image }
          : { type: "placeholder" };
    }
  }

  // reset handler event
  const handleReset = () => {
    setBoardTeams(shuffleArray(teams));
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main w-full max-w-md rounded-xl gap-2 p-2">
      {board.map((cell, i) => (
        <div key={i} className="aspect-square flex items-center justify-center">
          {cell.type === "reset" && (
            <button
              onClick={handleReset}
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
            <img
              src={cell.content}
              alt="Jugador"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
          {cell.type === "placeholder" && (
            <Shirt className="size-full text-color2/30 cursor-pointer p-1 md:p-4 hover:bg-color1/20 rounded-2xl transition duration-200" />
          )}
        </div>
      ))}
    </div>
  );
}
