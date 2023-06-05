import "./Cell.css";

type CellProps = {
  x: number;
  y: number;
  value: number;
  increaseValue: (x: number, y: number) => void;
}

function Cell({ x, y, value, increaseValue }: CellProps) {
  const increaseCellValue = () => {
    increaseValue(x, y);
  };
  
  return (
    <div onClick={increaseCellValue} className="cell">{value ? value : ""}</div>
  );
}

export default Cell;