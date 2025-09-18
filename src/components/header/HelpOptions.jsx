"use client";
import { useMemo } from "react";
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

export default function HelpOptions({ selectedCell, playersData, teamsMap }) {
  // Opciones de jugadores para la celda seleccionada
  const options = useMemo(() => {
    if (!selectedCell) return [];
    const team = teamsMap[selectedCell];
    if (!team) return [];
    return playersData.filter(player => player.Teams.includes(team));
  }, [selectedCell, playersData, teamsMap]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={selectedCell === null}
 variant="outline">
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
