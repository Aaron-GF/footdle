import { useEffect } from "react";

/**
 * Hook personalizado para gestionar el mapeo de equipos
 * @param {Array} teams - Array de objetos de equipo
 * @param {Function} setTeamsMap - Callback para actualizar el mapeo de equipos en el padre
 */
export function useTeamsMap(teams, setTeamsMap) {
  useEffect(() => {
    if (!teams.length || typeof setTeamsMap !== "function") return;

    const map = {};

    // Celdas de encabezado
    [1, 2, 3].forEach((i, idx) => {
      if (teams[idx]) map[i] = teams[idx].name;
    });
    [4, 8, 12].forEach((i, idx) => {
      if (teams[idx + 3]) map[i] = teams[idx + 3].name;
    });

    // Celdas jugables
    for (let i = 5; i < 16; i++) {
      if ([4, 8, 12].includes(i)) continue; // saltar encabezados
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
}
