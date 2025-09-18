import ReportErrorApp from "@/components/header/ReportErrorApp";

export default function Header() {
  return (
    <header className="flex items-end gap-2 p-4">
      <img src="/header-icon.png" alt="balón de futbol sobre un cesped" className="size-7" />
      <h1 className="text-5xl font-bungee text-main">FOOTDLE</h1>
      <ReportErrorApp />
    </header>
  );
}
