import React, { useState, useEffect } from "react";
import { getFirestore } from "../../firebase/config";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { CustomSpinner } from "../CustomSpinner/CustomSpinner";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    const itemDb = getFirestore().collection("productos").doc(itemId);

    itemDb
      .get()
      .then((doc) => {
        if (doc.exists) {
          setItem({ id: doc.id, ...doc.data() });
        } else {
          setItem(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return <CustomSpinner />;
  }

  if (!item) {
    return (
      <div
        className="alert alert-danger fw-bold fs-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        PRODUCTO INEXISTENTE
      </div>
    );
  }

  return <ItemDetail {...item} />;
};
