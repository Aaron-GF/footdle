import playersData from "@/app/data/players.json";
import teams from "@/app/data/teams.js";
import { normalizeString } from "@/lib/utils/string";

describe("Combinaciones de equipos", () => {
  it("debería haber jugadores para todas las combinaciones posibles de equipos distintos", () => {
    const missingCombinations = [];

    // recorre todas las combinaciones posibles de equipos distintos
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const teamA = normalizeString(teams[i].name);
        const teamB = normalizeString(teams[j].name);

        // busca si existe algún jugador que pertenezca a ambos equipos
        const found = playersData.some((player) => {
          const playerTeams = player.Teams.map(normalizeString);
          return playerTeams.includes(teamA) && playerTeams.includes(teamB);
        });

        if (!found) {
          missingCombinations.push([teams[i].name, teams[j].name]);
        }
      }
    }

    if (missingCombinations.length > 0) {
      console.warn(
        "Faltan jugadores para las siguientes combinaciones de equipos:",
        missingCombinations
      );
    }

    expect(missingCombinations.length).toBe(0);
  });
});
