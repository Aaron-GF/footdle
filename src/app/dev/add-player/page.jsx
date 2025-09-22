"use client";

import { useState } from "react";
import teamsData from "@/app/data/teams"; 
import { useRouter } from "next/navigation";

export default function AddPlayerPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [message, setMessage] = useState("");

  // Solo renderiza en desarrollo
  if (process.env.NODE_ENV !== "development") return <p>Ruta solo en desarrollo</p>;

  const handleToggleTeam = (teamName) => {
    setSelectedTeams((prev) =>
      prev.includes(teamName) ? prev.filter((t) => t !== teamName) : [...prev, teamName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || selectedTeams.length === 0) return;

    const res = await fetch("/api/add-player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name: name, Teams: selectedTeams }),
    });

    if (res.ok) {
      setMessage("Jugador añadido correctamente!");
      setName("");
      setSelectedTeams([]);
      router.refresh();
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Añadir jugador (Dev Only)</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />

        <div>
          <p className="mb-2 font-semibold">Selecciona equipos:</p>
          <div className="grid grid-cols-3 gap-2">
            {teamsData.map((team) => (
              <label key={team.name} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTeams.includes(team.name)}
                  onChange={() => handleToggleTeam(team.name)}
                />
                <span>{team.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Añadir jugador
        </button>
      </form>
    </div>
  );
}
