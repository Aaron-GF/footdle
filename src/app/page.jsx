import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

export default function Home() {
  return (
    <div className="h-dvh">
      <Header />
      <aside className="p-5">
        <h2 className="text-2xl font-bold">Cuanto sabes de futbol?</h2>{" "}
        <p className="italic">
          Dependiendo de la casilla que selecciones busca el jugador
          correspondiente, actual o historico, que ha jugado en ambos equipos.
        </p>
      </aside>
      <Main />
    </div>
  );
}
