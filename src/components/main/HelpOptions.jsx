"use client";
import { useMemo } from "react";
import data from "@/app/data/players.json";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { normalizeString } from "@/lib/utils/string";

const playersData = data.playersData || [];

export default function HelpOptions({ selectedCell, teamsMap }) {
  // Opciones de jugadores para la celda seleccionada
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={selectedCell === null}
 variant="outline" className="text-green-500">
          Ayuda
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Opciones disponibles</AlertDialogTitle>
          <p className="text-sm mt-2">
            Estos son los jugadores que puedes usar para esta celda.
          </p>
        </AlertDialogHeader>
        <ul className="mt-4 space-y-2">
          {options.length === 0 ? (
            <li className="text-sm text-muted-foreground">
              No hay opciones disponibles
            </li>
          ) : (
            options.map((player) => (
              <li key={player.ID} className="p-2 bg-bg/50 rounded-md">
                {player.Name}
              </li>
            ))
          )}
        </ul>
        <AlertDialogFooter>
          <AlertDialogAction>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
