import { useEffect, useState } from "react";
import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseValue: (x: number, y: number) => void;
  fill: boolean;
}

function Cell({ x, y, value, increaseValue, fill }: CellProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const increaseCellValue = () => {
    increaseValue(x, y);
  };
  
  useEffect(() => {
    let ignore = false;
    
    if (fill && !ignore) {
      setBackgroundColor("yellow");
      
      const timer = setTimeout(() => {
        setBackgroundColor("");
      }, 1000);
      
      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }
  }, [value, fill]);
  
  return (
    <div
      style={{ ...(fill && { backgroundColor }) }}
      onClick={increaseCellValue}
      className="cell"
    >{value ? value : ""}</div>
  );
}

export default Cell;