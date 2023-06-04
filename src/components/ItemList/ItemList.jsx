import React from "react";
import "./Itemlist.css";
import { Item } from "../Item/Item";

export const ItemList = ({ titulo, productos: products = [] }) => {
  return (
    <div className="container">
      <h3 className="mt-3 fs-2 fw-bold">{titulo}</h3>
      <hr />
      <div className="fila">
        {products
          .filter((product) => product.stock > 0) // Filtra los productos con stock mayor a 0
          .map((product) => (
            <Item {...product} key={product.id} />
          ))}
      </div>
    </div>
  );
};
