import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plantData, onAddPlant, onDelete, onUpdatePrice }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadPlants() {
      const res = await fetch("http://localhost:6001/plants");
      const data = await res.json();
      onAddPlant(data);
    }
    loadPlants();
  }, [onAddPlant]);

  const filteredPlants = plantData.filter(
    (plant) =>
      plant.name &&
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search onSearch={setSearchTerm} />
      <PlantList
        plants={filteredPlants}
        onDelete={onDelete}
        onUpdatePrice={onUpdatePrice}
      />
    </main>
  );
}

export default PlantPage;
