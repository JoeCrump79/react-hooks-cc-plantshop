import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ ps, onDelete, onUpdatePrice }) {
  return (
    <ul className="cards">
      {ps.map((p) => (
        <PlantCard
          key={p.id}
          p={p}
          onDelete={onDelete}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default PlantList;
