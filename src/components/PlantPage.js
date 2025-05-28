import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plantData, setPlantData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plants) => setPlantData(plants));
  }, []);

  function handleAdd(newPlantData) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlantData),
    })
      .then((r) => r.json())
      .then((createdPlant) => {
        setPlantData([...plantData, createdPlant]);
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
         setPlantData(plantData.filter((plant) => plant.id !== id));
      });
   
  }

  function handleUpdatePrice(id, newPrice) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        const updatedList = plantData.map((plant) =>
          plant.id === id ? updatedPlant : plant
        );
        setPlantData(updatedList);
      });
  }

  const visiblePlants = plantData.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAdd={handleAdd} />
      <Search search={search} setSearch={setSearch} />
      <PlantList
        plants={visiblePlants}
        onDelete={handleDelete}
        onUpdatePrice={handleUpdatePrice}
      />
    </main>
  );
}

export default PlantPage;
