import { useEffect, useRef, useState, memo } from "react";
import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseRowAndColumnValues: (x: number, y: number) => void;
}

export function Cell({ x, y, value, increaseRowAndColumnValues }: CellProps) {
  const previousValue = useRef<number | null>(null);
  const [background, setBackground] = useState("");
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (previousValue.current !== null && previousValue.current !== value) {
      setBackground("yellow");
      
      timer = setTimeout(() => {
        setBackground("");
      }, 500);
    }
    
    previousValue.current = value;
    
    return () => {
      clearTimeout(timer);
    }
  }, [value]);
  
  return (
    <div
      onClick={() => increaseRowAndColumnValues(x, y)}
      className={`cell`}
      style={{ backgroundColor: background }}
    >{value ? value : ""}</div>
  );
}

export const MemoedCell = memo(Cell);