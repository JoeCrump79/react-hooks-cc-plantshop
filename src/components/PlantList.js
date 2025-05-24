import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onUpdatePrice }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDelete={onDelete}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default PlantList;
