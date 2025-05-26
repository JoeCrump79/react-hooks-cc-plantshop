import React, { useState } from "react";

function PlantCard({ plant, onDelete, onUpdatePrice }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  function handleDeleteClick() {
    onDelete(plant.id);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    const updatedPrice = parseFloat(newPrice);

    if (isNaN(updatedPrice)) return;

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedPrice }),
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        onUpdatePrice(updatedPlant);
        setNewPrice("");
      });
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button
        className={isSoldOut ? "primary" : ""}
        onClick={() => setIsSoldOut((prev) => !prev)}
      >
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
      <button onClick={handleDeleteClick}>Delete</button>

      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="New Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
