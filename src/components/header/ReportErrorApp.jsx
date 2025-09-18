"use client"
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
        <Button variant="outline">Reportar error</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reportar un error</AlertDialogTitle>
        </AlertDialogHeader>
        <form action="https://api.web3forms.com/submit" method="POST">
          <input
            type="hidden"
            name="access_key"
            value={process.env.ACCESS_KEY}
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
            required
          />
          <input type="checkbox" name="botcheck" className="hidden"></input>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">Reportar</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
