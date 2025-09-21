"use client";
import Board from "@/components/main/Board";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

export default function WinGame({
  players,
  selectedCell,
  onCellSelect,
  onReset,
  setTeamsMap,
}) {
  // comprueba cuántos jugadores hay en el tablero
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

      {/* Botón de prueba solo en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => setTest(prev => !prev)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded fixed top-4 right-4 z-50"
        >
          Test confetti
        </button>
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
