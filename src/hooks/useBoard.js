import { useState, useEffect } from "react";
import teamsData from "@/app/data/teams";
import playersData from "@/app/data/players.json";
import { shuffleArray } from "@/lib/utils/array";
import { normalizeString } from "@/lib/utils/string";

const players = playersData.playersData || [];

/**
 * Verifica si existe al menos un jugador que haya jugado en ambos equipos
 * @param {string} team1 - Nombre del primer equipo
 * @param {string} team2 - Nombre del segundo equipo
 * @returns {boolean} - true si existe al menos un jugador válido
 */
function hasValidPlayer(team1, team2) {
  return players.some((player) => {
    const playerTeams = (player.Teams || []).map(normalizeString);
    return (
      playerTeams.includes(normalizeString(team1)) &&
      playerTeams.includes(normalizeString(team2))
    );
  });
}

/**
 * Genera una combinación válida de 6 equipos donde todas las combinaciones
 * tienen al menos un jugador disponible
 * @param {Array} allTeams - Array de todos los equipos disponibles
 * @returns {Array} - Array de 6 equipos válidos
 */
function generateValidTeamCombination(allTeams) {
  const maxAttempts = 100; // Evitar bucle infinito
  let attempts = 0;

  while (attempts < maxAttempts) {
    const shuffled = shuffleArray([...allTeams]);
    const selectedTeams = shuffled.slice(0, 6);

    // Verificar todas las combinaciones posibles (3x3 = 9 celdas)
    const rowTeams = selectedTeams.slice(0, 3);
    const colTeams = selectedTeams.slice(3, 6);

    let allCombinationsValid = true;

    for (const rowTeam of rowTeams) {
      for (const colTeam of colTeams) {
        if (!hasValidPlayer(rowTeam.name, colTeam.name)) {
          allCombinationsValid = false;
          break;
        }
      }
      if (!allCombinationsValid) break;
    }

    if (allCombinationsValid) {
      return selectedTeams;
    }

    attempts++;
  }

  // Si no se encuentra una combinación válida después de muchos intentos,
  // devolver los primeros 6 equipos (fallback)
  console.warn("No se pudo encontrar una combinación válida de equipos");
  return allTeams.slice(0, 6);
}

/**
 * Hook personalizado para gestionar el estado y la generación del tablero
 * @param {Object} players - Objeto que mapea los índices de celda a datos de jugador
 * @returns {Object} - { board, teams, handleReset }
 */
export function useBoard(players = {}) {
  const [teams, setTeams] = useState([]);

  // Genera una combinación válida de equipos al montar el componente
  useEffect(() => {
    setTeams(generateValidTeamCombination(teamsData));
  }, []);

  // Genera el tablero
  const generateBoard = () => {
    const board = Array(16).fill(null);

    // Primera celda → botón de reinicio
    board[0] = { type: "reset" };

    // Primera fila → logotipos de equipos
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

    // Primera columna → logotipos de equipos (saltar botón de reinicio)
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

    // Celdas restantes → jugadores o relleno
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

    return board;
  };

  const board = generateBoard();

  const handleReset = () => {
    setTeams(generateValidTeamCombination(teamsData));
  };

  return { board, teams, handleReset };
}
