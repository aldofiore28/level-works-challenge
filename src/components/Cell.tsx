import { useEffect, useRef, useState } from "react";
import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseValue: (x: number, y: number) => void;
}

function Cell({ x, y, value, increaseValue }: CellProps) {
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
      onClick={() => increaseValue(x, y)}
      className={`cell`}
      style={{ backgroundColor: background }}
    >{value ? value : ""}</div>
  );
}

export default Cell;