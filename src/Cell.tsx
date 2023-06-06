import { useEffect, useState } from "react";
import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseValue: (x: number, y: number) => void;
  toFill: string[];
  toFillFibonacci: string[];
}

function Cell({ x, y, value, increaseValue, toFill, toFillFibonacci }: CellProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const fillGreen = !!toFillFibonacci.length && toFillFibonacci.includes(`${x}-${y}`);
  const fillYellow = !!toFill.length && toFill.includes(`${x}-${y}`);
  const fillColor = fillGreen ? "green" : fillYellow ? "yellow" : "";
  const fill = fillGreen || fillYellow;
  
  const increaseCellValue = () => {
    increaseValue(x, y);
  };
  
  useEffect(() => {
    let ignore = false;

    if (fill && !ignore) {
      setBackgroundColor(fillColor);
      const timer = setTimeout(() => {
        setBackgroundColor("");
      }, 1000);

      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }
  }, [value, fill, fillColor]);
  
  return (
    <div
      style={{ ...(fill && { backgroundColor }) }}
      onClick={increaseCellValue}
      className="cell"
    >{value ? value : ""}</div>
  );
}

export default Cell;