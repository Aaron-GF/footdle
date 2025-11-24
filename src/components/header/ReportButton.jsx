"use client";
import { useState } from "react";
import ReportForm from "@/components/ReportForm";

export default function ReportButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border-2 border-red-500/50 text-red-500 font-medium rounded-lg hover:bg-red-500/10 transition-all"
      >
        ⚠️ Reportar error
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="bg-background rounded-xl shadow-2xl border border-foreground/10 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">⚠️ Reportar un error</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/60 hover:text-foreground transition p-2 rounded-full hover:bg-foreground/10"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </header>

            <ReportForm />

            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 mt-4 border-2 border-foreground/20 font-medium rounded-lg hover:bg-foreground/10 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
