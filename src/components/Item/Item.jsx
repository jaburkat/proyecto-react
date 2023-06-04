import React from "react";
import "./Item.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Item = ({ id, nombre, precio, imagen, categoria, stock }) => {
  return (
    <div className="item">
      <Card>
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title className="fw-bold fs-4">{nombre}</Card.Title>
          <Card.Title className="text-secondary">
            Categoria: {categoria}
          </Card.Title>
          <Card.Title className="fw-bold fs-3 text-success">
            $ {precio}
          </Card.Title>
          <Link to={`/item/${id}`}>
            <Button className="mt-2 mb-2" variant="primary">
              Detalles
            </Button>
          </Link>
          <Card.Footer className="mt-2">Stock: {stock}</Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};
