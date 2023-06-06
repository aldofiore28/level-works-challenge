import { useEffect, useState } from "react";
import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseValue: (x: number, y: number) => void;
  addToResetQueue: (x: number, y: number) => void;
  resetToFill: () => void;
  toFill: string[];
  toFillFibonacci: string[];
}

function Cell({ x, y, value, increaseValue, toFill, toFillFibonacci, addToResetQueue, resetToFill }: CellProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const fillGreen = !!toFillFibonacci.length && toFillFibonacci.includes(`${x}-${y}`);
  const fillYellow = !!toFill.length && toFill.includes(`${x}-${y}`);
  // Order matters here, first check for green, then yellow
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
        if (fillGreen) {
          addToResetQueue(x, y);
        }
        
        if (fillYellow) {
          resetToFill();
        }
        
        setBackgroundColor("");
      }, 1000);
      
      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }
  }, [value, fill, fillColor, x, y, addToResetQueue, fillGreen, fillYellow, resetToFill]);
  
  return (
    <div
      style={{ ...(fill && { backgroundColor }) }}
      onClick={increaseCellValue}
      className="cell"
    >{value ? value : ""}</div>
  );
}

export default Cell;