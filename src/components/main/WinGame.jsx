"use client";
import Board from "@/components/main/Board";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useRouter } from "next/navigation";

export default function WinGame({
  players,
  selectedCell,
  onCellSelect,
  onReset,
  setTeamsMap,
}) {
  const router = useRouter();

  // comprueba si el tablero esta completo
  const isWin = Object.keys(players).length === 9;

  // estado para el boton de prueba
  const [test, setTest] = useState(false);

  return (
    <div className="relative">
      <Board
        players={players}
        selectedCell={selectedCell}
        onCellSelect={onCellSelect}
        onReset={onReset}
        setTeamsMap={setTeamsMap}
      />

      {/* Botones solo en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          <button
            onClick={() => setTest(prev => !prev)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Test confetti
          </button>

          <button
            onClick={() => router.push("/dev/add-player")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Añadir jugador
          </button>
        </div>
      )}

      {/* Confeti */}
      {(test || isWin) && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <ConfettiExplosion
            force={1}
            duration={4000}
            particleCount={500}
          />
        </div>
      )}
    </div>
  );
}
