import React, { useState } from "react";

function PlantCard({ plant, onDelete, onUpdatePrice }) {
  const [isInStock, setIsInStock] = useState(true);
  const [priceInput, setPriceInput] = useState(plant.price);

  function handleClick() {
    setIsInStock(!isInStock);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePrice(plant.id, parseFloat(priceInput));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
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
        onClick={() => onDelete(plant.id)}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
