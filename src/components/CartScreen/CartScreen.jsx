import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CartContext } from "../Context/CartContext";
import "./CartScreen.css";

export const CartScreen = () => {
  const { carrito, precioTotal, removerItem, vaciarCarrito } =
    useContext(CartContext);

  return (
    <div className="container my-4">
      {carrito.length === 0 ? (
        <>
          <h3 className="fw-bold fs-2">Carrito vacio</h3>
          <hr />
          <Link to="/" className="btn btn-primary">
            Volver a comprar
          </Link>
        </>
      ) : (
        <>
          <h3 className="fw-bold fs-2">Resumen de compras</h3>
          <hr />
          {carrito.map((prod) => (
            <>
              <div className="listado mt-3">
                <p>{prod.nombre}</p>
                <p>${prod.precio}</p>
                <p>Cantidad: {prod.counter}</p>

                <Button
                  className="btn btn-danger"
                  onClick={() => removerItem(prod.id)}
                >
                  <BsFillTrash3Fill />
                </Button>
              </div>
            </>
          ))}
          <hr />
          <span className="fs-3 fw-bold">Total: </span>
          <span className="fs-3 fw-bold text-success">${precioTotal()}</span>
          <hr />
          <Button className="btn btn-warning me-3" onClick={vaciarCarrito}>
            Vaciar Carrito
          </Button>
          <Link className="btn btn-success" to="/checkout">
            Terminar compra
          </Link>
        </>
      )}
    </div>
  );
};
