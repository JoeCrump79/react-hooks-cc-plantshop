import React, { useState } from "react";

function PlantCard({ p, onDelete, onUpdatePrice }) {
  const [isClicked, setIsClicked] = useState(true);
  const [priceInput, setPriceInput] = useState(p.price);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePrice(p.id, parseFloat(priceInput));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={p.image} alt={p.name} />
      <h4>{p.name}</h4>
      <p>Price: {p.price}</p>
      {isClicked ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />
        <button type="submit">Update Price</button>
      </form>
      <button
        onClick={() => onDelete(p.id)}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
