import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getFirestore } from "../../firebase/config";
import firebase from "firebase";
import "firebase/firestore";
import "./Checkout.css";

export const Checkout = () => {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const orden = {
      buyer: {
        email,
        nombre,
        apellido,
        telefono,
      },
      item: carrito,
      total_price: precioTotal(),
      data: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    console.log(orden);

    const db = getFirestore();
    const ordenes = db.collection("ordenes");

    ordenes
      .add(orden)
      .then((res) => {
        vaciarCarrito();

        Swal.fire({
          icon: "success",
          title: "Su compra se realizó con éxito",
          text: `Guarde su número de compra: ${res.id}`,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("Operación finalizada"));

    carrito.forEach((item) => {
      const docRef = db.collection("productos").doc(item.id);

      docRef
        .get()
        .then((doc) => {
          docRef.update({
            stock: doc.data().stock - item.counter,
          });
        })
        .catch((error) => console.log(error));
    });
  };

  useEffect(() => {
    if (carrito.length === 0) {
      navigate("/");
    }
  }, [carrito, navigate]);

  return (
    <div>
      <h3 className="mt-3 fs-2 fw-bold">Finalizar compra</h3>
      <hr />

      <form onSubmit={handleSubmit} className="container mt-3">
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
              required
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn btn-success submit-button">
          Finalizar
        </button>
        <Link to="/cart" className="btn btn-primary submit-button">
          Volver al carrito
        </Link>
      </form>
    </div>
  );
};
