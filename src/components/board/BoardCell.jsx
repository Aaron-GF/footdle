import ResetCell from "./ResetCell";
import TeamCell from "./TeamCell";
import PlayerCell from "./PlayerCell";
import PlaceholderCell from "./PlaceholderCell";

export default function BoardCell({
  cell,
  index,
  isSelected,
  onCellSelect,
  onReset,
}) {
  // Añade clases visuales cuando la celda está seleccionada
  const wrapperClass =
    "aspect-square flex items-center justify-center transition relative " +
    (isSelected ? "opacity-60 rounded-md" : "");

  // Solo las celdas de relleno/jugador responden al clic para la selección
  const clickable = cell.type === "placeholder" || cell.type === "player";

  const handleClick = () => {
    if (cell.type === "reset") return;
    if (clickable && typeof onCellSelect === "function") {
      onCellSelect(index);
    }
  };

  return (
    <div
      className={wrapperClass}
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Casilla ${index}`}
    >
      {cell.type === "reset" && <ResetCell onReset={onReset} />}
      {cell.type === "team" && (
        <TeamCell logo={cell.content} teamName={cell.teamName} />
      )}
      {cell.type === "player" && <PlayerCell name={cell.name} />}
      {cell.type === "placeholder" && <PlaceholderCell />}
    </div>
  );
}
