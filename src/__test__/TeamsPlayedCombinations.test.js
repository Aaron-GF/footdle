import playersData from "@/app/data/players.json";
import teams from "@/app/data/teams.js";
import { normalizeString } from "@/lib/utils/string";

describe("Combinaciones de equipos", () => {
  it("debería haber al menos un jugador para cada combinación posible de equipos distintos", () => {
    const missingCombinations = [];

    // recorre todas las combinaciones posibles de equipos distintos
    teams.forEach((teamA, i) => {
      for (let j = i + 1; j < teams.length; j++) {
        const teamB = teams[j];
        const normalizedA = normalizeString(teamA.name);
        const normalizedB = normalizeString(teamB.name);

        // busca un jugador que pertenezca a ambos equipos
        const player = playersData.find((p) => {
          if (!p.Teams) return false;
          const playerTeams = p.Teams.map(normalizeString);
          return playerTeams.includes(normalizedA) && playerTeams.includes(normalizedB);
        });

        if (!player) {
          missingCombinations.push([teamA.name, teamB.name]);
        } else {
          // imprime un jugador ejemplo por combinación
          console.log(`Ejemplo para ${teamA.name} + ${teamB.name}: ${player.Name}`);
        }
      }
    });

    if (missingCombinations.length > 0) {
      console.warn(
        "Faltan jugadores para las siguientes combinaciones de equipos:",
        missingCombinations
      );
    }

    expect(missingCombinations.length).toBe(0);
  });
});
