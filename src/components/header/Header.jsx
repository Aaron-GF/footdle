import ReportButton from "@/components/header/ReportButton";
import HelpOptions from "@/components/header/HelpOptions";

export default function Header({ selectedCell, teamsMap, playersData }) {
  return (
    <header className="flex flex-wrap items-center gap-2 p-4">
      <img
        src="/header-icon.png"
        alt="balón de futbol sobre un cesped"
        className="size-7"
      />
      <h1 className="text-5xl font-bungee text-main mr-10">FOOTDLE</h1>

      <div className="flex gap-3">
        {/* Botón para el envío de errores en el juego */}
        <ReportButton />
        {/* Botón para mostrar opciones de ayuda en el juego*/}
        <HelpOptions
          selectedCell={selectedCell}
          teamsMap={teamsMap}
          playersData={playersData}
        />
      </div>
    </header>
  );
}
