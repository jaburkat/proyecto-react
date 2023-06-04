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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern =
    /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
  const phonePattern =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [nombre, setNombre] = useState("");
  const [nombreValid, setNombreValid] = useState(false);
  const [apellido, setApellido] = useState("");
  const [apellidoValid, setApellidoValid] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [telefonoValid, setTelefonoValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

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

  const isFormValid = () => {
    return emailValid && nombreValid && apellidoValid && telefonoValid;
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
      <h4 className="mt-3">
      Por favor, para poder finalizar la compra, ingrese todos los datos del formulario.
      </h4>
      <form onSubmit={handleSubmit} className="container mt-3">
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className={`form-control ${
                emailValid ? "is-valid" : "is-invalid"
              }`}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailValid(emailPattern.test(value));
              }}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className={`form-control ${
                nombreValid ? "is-valid" : "is-invalid"
              }`}
              onChange={(e) => {
                const value = e.target.value;
                setNombre(value);
                setNombreValid(namePattern.test(value));
              }}
              value={nombre}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className={`form-control ${
                apellidoValid ? "is-valid" : "is-invalid"
              }`}
              onChange={(e) => {
                const value = e.target.value;
                setApellido(value);
                setApellidoValid(namePattern.test(value));
              }}
              value={apellido}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono </label>
            <input
              type="text"
              className={`form-control ${
                telefonoValid ? "is-valid" : "is-invalid"
              }`}
              onChange={(e) => {
                const value = e.target.value;
                setTelefono(value);
                setTelefonoValid(phonePattern.test(value));
              }}
              value={telefono}
              placeholder="Código de área + número 🇦🇷"
              required
            />
          </div>
        </div>
        <br />

        <Link to="/cart" className="btn btn-primary submit-button">
          Volver al carrito
        </Link>
        <button
          type="submit"
          className="btn btn btn-success submit-button"
          disabled={!isFormValid()}
        >
          Finalizar
        </button>
      </form>
    </div>
  );
};
