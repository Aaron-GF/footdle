"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReportForm from "@/components/ReportForm";

export default function ReportErrorApp() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-red-500">
          Reportar error
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/* botón de cerrar arriba a la derecha */}
        <AlertDialogCancel
          className="absolute right-2 top-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 w-3"
        >
          ✖
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Reportar un error</AlertDialogTitle>
        </AlertDialogHeader>
        <ReportForm />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
