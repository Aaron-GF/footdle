import { useEffect } from "react";

/**
 * Hook para manejar la navegación con teclado entre celdas del tablero
 * @param {number|null} selectedCell - Índice de la celda actualmente seleccionada
 * @param {Function} setSelectedCell - Función para actualizar la celda seleccionada
 */
export function useKeyboardNavigation(selectedCell, setSelectedCell) {
  useEffect(() => {
    // Solo las celdas donde se pueden colocar jugadores (5, 6, 7, 9, 10, 11, 13, 14, 15)
    const playableCells = [5, 6, 7, 9, 10, 11, 13, 14, 15];

    const handleKeyDown = (e) => {
      // Solo manejar teclas de flecha si hay una celda seleccionada
      if (selectedCell === null) return;
      if (!playableCells.includes(selectedCell)) return;

      // Prevenir scroll de la página
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      // Calcular posición actual en la cuadrícula 3x3 de celdas jugables
      const currentIndex = playableCells.indexOf(selectedCell);
      if (currentIndex === -1) return;

      const row = Math.floor(currentIndex / 3);
      const col = currentIndex % 3;

      let newRow = row;
      let newCol = col;

      // Determinar nueva posición según la tecla presionada
      switch (e.key) {
        case "ArrowUp":
          newRow = row > 0 ? row - 1 : row;
          break;
        case "ArrowDown":
          newRow = row < 2 ? row + 1 : row;
          break;
        case "ArrowLeft":
          newCol = col > 0 ? col - 1 : col;
          break;
        case "ArrowRight":
          newCol = col < 2 ? col + 1 : col;
          break;
        default:
          return;
      }

      // Calcular nuevo índice en el array de celdas jugables
      const newIndex = newRow * 3 + newCol;
      const newCell = playableCells[newIndex];

      // Actualizar celda seleccionada si cambió
      if (newCell !== selectedCell) {
        setSelectedCell(newCell);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, setSelectedCell]);
}
