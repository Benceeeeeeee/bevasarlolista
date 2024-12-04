import React, { useState } from "react";
import "./app.css";

interface Product {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
}

const ShoppingList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [error, setError] = useState("");

  const addProduct = () => {
    if (!name.trim() || !quantity.trim() || !unit.trim()) {
      setError("Minden mezőt kötelező kitölteni!");
      return;
    }

    if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setError("A mennyiségnek pozitív számnak kell lennie");
      return;
    }

    if (
      products.some(
        (product) =>
          product.name.toLowerCase() === name.trim().toLowerCase() &&
          product.unit.toLowerCase() === unit.trim().toLowerCase()
      )
    ) {
      setError("Ez a termék már benne van a listában");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: name.trim(),
      quantity: Number(quantity),
      unit: unit.trim(),
      purchased: false,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setName("");
    setQuantity("");
    setUnit("");
    setError("");
  };

  const togglePurchased = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, purchased: !product.purchased }
          : product
      )
    );
  };

  const removeProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const notPurchasedCount = products.filter((product) => !product.purchased).length;

  return (
    <div className="shopping-container">
      <h2>Bevásárló lista</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Terméknév"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mennyiség"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mennyiségi egység"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button onClick={addProduct}>Hozzáadás</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul className="product-list">
        {products.map((product) => (
          <li
            key={product.id}
            className={`product ${product.purchased ? "purchased" : "not-purchased"}`}
          >
            <span>
              {product.name} - {product.quantity} {product.unit}
            </span>
            <button onClick={() => togglePurchased(product.id)}>
              {product.purchased ? "Visszaállítás" : "Megvásárolva"}
            </button>
            <button onClick={() => removeProduct(product.id)}>Törlés</button>
          </li>
        ))}
      </ul>
      {notPurchasedCount > 0 && (
        <div className="status">
          <p className="not-purchased-status">
            {notPurchasedCount} tétel van hátra.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
