import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

export default function Home() {
  return (
    <div className="">
      <Header />
      <aside className="p-5 flex flex-col gap-3 bg-color2 border border-color1 rounded-md w-9/10 md:w-8/10 mx-auto md:text-lg my-7">
        <h2 className="text-2xl font-bold">Cuanto sabes de futbol?</h2>{" "}
        <p className="italic">
          Dependiendo de la casilla que selecciones busca el jugador
          correspondiente, actual o historico, que ha jugado en ambos equipos.
        </p>
        <p className="italic">
          Existe un boton para reportar errores en caso de encontrar algun fallo con un jugador que no corresponde, datos erroneos en jugadores o jugadores que crees que deberían incluirse en la base de datos.
        </p>
        <p className="italic">Ademas esta la opción de ayuda, para en caso de no ser capaz de completar el juego, mostrar las posibles opciones de jugadores de la casilla seleccionada</p>
      </aside>
      <Main />
    </div>
  );
}
