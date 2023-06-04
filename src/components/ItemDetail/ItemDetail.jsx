import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { ItemCount } from "../ItemCount/ItemCount";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import "./ItemDetail.css";
import Swal from "sweetalert2";
export const ItemDetail = ({
  id,
  nombre,
  descripcion,
  precio,
  imagen,
  categoria,
  stock,
}) => {
  const navigate = useNavigate();

  const volverHaciaAtras = () => {
    navigate(-1);
  };

  const { addToCart } = useContext(CartContext);

  const [counter, setCounter] = useState(1);

  const sumarAlCarrito = () => {
    const newItem = {
      id,
      nombre,
      descripcion,
      precio,
      imagen,
      categoria,
      counter,
    };
    console.log(newItem);
    addToCart(newItem);

    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="item1">
      <Card>
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title className="card-title-nombre">{nombre}</Card.Title>
          <Card.Title className="card-title-descripcion">
            {descripcion}
          </Card.Title>
          <Card.Title className="fw-bold text-success  fs-2">
            $ {precio}
          </Card.Title>
          <ItemCount max={stock} modify={setCounter} cantidad={counter} />
          <br />
          <Button onClick={sumarAlCarrito} className="btn btn-warning">
            Agregar al carrito
          </Button>
        </Card.Body>
        <div className="d-flex justify-content-between botones">
          <Button
            onClick={volverHaciaAtras}
            className="btn btn-secondary btn-volver"
          >
            Volver atrás
          </Button>
          <Link to="/cart" className="btn btn-info btn-carrito">
            Ir al carrito
          </Link>
        </div>
      </Card>
    </div>
  );
};
