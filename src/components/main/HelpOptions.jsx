"use client";
import { useState, useMemo } from "react";
import data from "@/app/data/players.json";
import { normalizeString } from "@/lib/utils/string";

const playersData = data.playersData || [];

export default function HelpOptions({ selectedCell, teamsMap }) {
  const [isOpen, setIsOpen] = useState(false);

  // Filtra jugadores válidos para la celda seleccionada
  const options = useMemo(() => {
    if (selectedCell === null) return [];

    const { rowTeam, colTeam } = teamsMap[selectedCell] || {};
    if (!rowTeam || !colTeam) return [];

    return playersData.filter((player) => {
      const normalized = (player.Teams || []).map(normalizeString);
      return (
        normalized.includes(normalizeString(rowTeam)) &&
        normalized.includes(normalizeString(colTeam))
      );
    });
  }, [selectedCell, teamsMap]);

  return (
    <>
      <button
        disabled={selectedCell === null}
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
      >
        💡 Ayuda
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="bg-background rounded-xl shadow-2xl border border-foreground/10 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Opciones disponibles</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/60 hover:text-foreground transition px-2 py-1 rounded-full hover:bg-foreground/10"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </header>

            <p className="text-sm text-foreground/80 mb-4">
              Estos son los jugadores que puedes usar para esta celda.
            </p>

            <ul className="space-y-2 mb-4 overflow-y-scroll max-h-[280px]">
              {options.length === 0 ? (
                <li className="text-sm italic text-foreground/60">
                  No hay opciones disponibles
                </li>
              ) : (
                options.map((player) => (
                  <li
                    key={player.ID}
                    className="p-3 bg-secondary/50 rounded-md hover:bg-secondary/20 transition"
                  >
                    {player.Name}
                  </li>
                ))
              )}
            </ul>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
