import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseValue: (x: number, y: number) => void;
  toFill: string[];
  fill: boolean;
}

function Cell({ x, y, value, increaseValue, fill, toFill }: CellProps) {
  const increaseCellValue = () => {
    increaseValue(x, y);
  };
  
  const style = toFill.length && fill ? { backgroundColor: "yellow" } : {};
  
  return (
    <div
      style={{ ...style }}
      onClick={increaseCellValue}
      className="cell"
    >{value ? value : ""}</div>
  );
}

export default Cell;