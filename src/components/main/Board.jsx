"use client";
import { Shirt } from "lucide-react";
import teams from "@/app/data/teams";
import { shuffleArray } from "@/lib/utils/array";

export default function Board({ player }) {
  const shuffled = shuffleArray(teams);
  const board = Array(16).fill(null);

  // Primer cuadrado → logo
  board[0] = { type: "logo", content: "/header-icon.png" };

  // Primera fila → escudos
  [1, 2, 3].forEach((i, idx) => (board[i] = { type: "team", content: shuffled[idx].logo }));

  // Primera columna → escudos (evitando la esquina ya ocupada)
  [4, 8, 12].forEach((i, idx) => (board[i] = { type: "team", content: shuffled[idx + 3].logo }));

  // Resto → jugadores o placeholders
  for (let i = 0; i < 16; i++) {
    if (!board[i]) {
      board[i] = player && player[0] ? { type: "player", content: player[0].image } : { type: "placeholder" };
    }
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main w-full max-w-md rounded-xl gap-2 p-2">
      {board.map((cell, i) => (
        <div
          key={i}
          className="aspect-square flex items-center justify-center  "
        >
          {cell.type === "logo" && <img src={cell.content} alt="Logo" className="object-contain size-full md:p-3" />}
          {cell.type === "team" && <img src={cell.content} alt="Team" className="size-full p-1 md:p-4 object-contain" />}
          {cell.type === "player" && <img src={cell.content} alt="Jugador" className="w-full h-full object-cover rounded-2xl" />}
          {cell.type === "placeholder" && <Shirt className="size-full text-color2/30 cursor-pointer p-1 md:p-4 hover:bg-color1/20 rounded-2xl transition duration-200" />}
        </div>
      ))}
    </div>
  );
}
