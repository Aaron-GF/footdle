import { normalizeString } from "@/lib/utils/string.js";
import data from "@/app/data/players.json";
import teams from "@/app/data/teams.js";

const playersData = data.playersData || []; // para poder usar players.json importando directamente

describe("Combinaciones de equipos", () => {
  it("debería haber al menos un jugador para cada combinación posible de equipos distintos", () => {
    const missingCombinations = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const teamA = normalizeString(teams[i].name);
        const teamB = normalizeString(teams[j].name);

        const player = playersData.find((p) => {
          if (!p.Teams) return false;
          const playerTeams = p.Teams.map(normalizeString);
          return playerTeams.includes(teamA) && playerTeams.includes(teamB);
        });

        if (!player) {
          console.log(`❌ No encontrado: ${teams[i].name} + ${teams[j].name}`);
          missingCombinations.push([teams[i].name, teams[j].name]);
        } else {
          console.log(`✅ Ejemplo: ${teams[i].name} + ${teams[j].name} -> ${player.Name}`);
        }
      }
    }

    expect(missingCombinations.length).toBe(0);
  });
});
