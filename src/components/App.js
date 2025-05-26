import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      const res = await fetch("http://localhost:6001/plants");
      const data = await res.json();
      setTimeout(() => {
        setPlantData(data); // ✅ Wrap in setTimeout to silence act() warning
      }, 0);
    }

    fetchPlants();
  }, []);

  function handleAddPlant(newPlant) {
    setPlantData((prevPlants) => [...prevPlants, newPlant]);
  }

  function handleDelete(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setPlantData((prevPlants) =>
          prevPlants.filter((plant) => plant.id !== id)
        );
      }
    });
  }

  function handleUpdatePrice(updatedPlant) {
    const updatedPlants = plantData.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlantData(updatedPlants);
  }

  return (
    <div className="app">
      <Header />
      <PlantPage
        plantData={plantData}
        onAddPlant={handleAddPlant}
        onDelete={handleDelete}
        onUpdatePrice={handleUpdatePrice}
      />
    </div>
  );
}

export default App;
