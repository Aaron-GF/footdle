import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form
      action=""
      className="flex items-center justify-center gap-3 bg-color1 p-3 rounded-4xl w-9/10 max-w-sm cursor-pointer mb-auto"
    >
      <Search className="text-main" />
      <input type="search" className="w-full outline-none text-main font-bold" placeholder="Busca el jugador..."/>
    </form>
  );
}
