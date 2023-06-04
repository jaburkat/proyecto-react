import "./ItemCount.css";
import Button from "react-bootstrap/Button";

export const ItemCount = ({ max, cantidad, modify }) => {
  const sumar = () => {
    if (cantidad < max) {
      modify(cantidad + 1);
    }
  };

  const restar = () => {
    if (cantidad > 1) {
      modify(cantidad - 1);
    }
  };

  return (
    <>
      {" "}
      <hr></hr>
      <h5> Cantidad: {cantidad}</h5>
      <div>
        <Button className="btn" variant="success" onClick={sumar}>
          +
        </Button>{" "}
        <Button className="btn" variant="danger" onClick={restar}>
          -
        </Button>{" "}
      </div>
      <hr></hr>
    </>
  );
};
