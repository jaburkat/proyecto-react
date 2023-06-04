import React, { useEffect, useState } from "react";
import { getFirestore } from "../../firebase/config";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { CustomSpinner } from "../CustomSpinner/CustomSpinner";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [titulo, setTitulo] = useState("Productos");
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const db = getFirestore();
    const productosPintureria = categoryId
      ? db.collection("productos").where("categoria", "==", categoryId)
      : db.collection("productos");

    setTitulo(categoryId ? categoryId : "Productos");
    productosPintureria
      .get()
      .then((res) => {
        if (res.empty) {
          setError(true);
        } else {
          const newItem = res.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setItems(newItem);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          {error ? (
            <div
              className="alert alert-danger fw-bold fs-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              CATEGORÍA NO ENCONTRADA
            </div>
          ) : (
            <ItemList productos={items} titulo={titulo} />
          )}
        </>
      )}
    </>
  );
};
