"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ReportErrorApp() {
  const [message, setMessage] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-red-600">Reportar error</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Reportar un error</AlertDialogTitle>
        </AlertDialogHeader>
        <form action="https://api.web3forms.com/submit" method="POST">
          <input
            type="hidden"
            name="access_key"
            value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY}
          ></input>
          <input
            type="hidden"
            name="subject"
            value="📬 Error reportado desde FOOTDLE"
          ></input>
          <textarea
            placeholder="Describe el error..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="outline-none w-full min-h-30 bg-stone-900 rounded-lg p-2"
            required
          />
          <input type="checkbox" name="botcheck" className="hidden"></input>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Reportar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
