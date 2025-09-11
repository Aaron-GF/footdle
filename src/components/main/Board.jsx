"use client";
import { Shirt } from "lucide-react";
import { use } from "react";

export default function Board({ player }) {
  const playerInfo = use(player);

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main w-full max-w-md rounded-xl cursor-pointer">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square text-bg flex items-center justify-center hover:bg-color1/20 rounded-2xl transition duration-200"
        >
          {playerInfo ? (
            <img
              src={playerInfo[0].image}
              alt={`imagen de ${playerInfo[0].name}`}
            />
          ) : (
            <Shirt className="size-20 opacity-20" />
          )}
        </div>
      ))}
    </div>
  );
}
