"use client";
import { useBoard } from "@/hooks/useBoard";
import { useTeamsMap } from "@/hooks/useTeamsMap";
import BoardCell from "@/components/board/BoardCell";

export default function Board({
  players = {},
  selectedCell = null,
  onCellSelect,
  onReset,
  setTeamsMap,
}) {
  const { board, teams, handleReset } = useBoard(players);
  useTeamsMap(teams, setTeamsMap);

  const handleResetClick = () => {
    handleReset();
    onCellSelect?.(null); // deselecciona la celda
    onReset?.();
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-primary xs:w-9/10 max-w-lg rounded-md gap-1 p-2">
      {board.map((cell, i) => (
        <BoardCell
          key={i}
          cell={cell}
          index={i}
          isSelected={selectedCell === i}
          onCellSelect={onCellSelect}
          onReset={handleResetClick}
        />
      ))}
    </div>
  );
}
