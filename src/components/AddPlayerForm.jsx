"use client";
import { useState } from "react";
import teams from "@/app/data/teams";
import data from "@/app/data/players.json";

const playersData = data.playersData || [];

export default function AddPlayerForm() {
    const lastID = playersData.playersData.length;

    const [name, setName] = useState("");
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [newPlayers, setNewPlayers] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      
    }

  return <div>PlayerGenerator</div>;
}
