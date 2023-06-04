import React, { useContext } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { CartContext } from "../Context/CartContext";

export const CartWidget = () => {
  const { calcularCantidad } = useContext(CartContext);

  return (
    <button
      type="button"
      className="btn btn-primary position-relative btn-lg btn-danger mt-2 ms-3"
    >
      <CgShoppingCart />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
        {calcularCantidad()}
      </span>
    </button>
  );
};
