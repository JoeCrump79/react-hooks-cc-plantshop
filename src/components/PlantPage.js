import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [pd, spd] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((p) => spd(p));
  }, []);

  function addPlant(newPlant) {
    spd([...pd, newPlant]);
  }

  function handleDelete(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    });
    spd(pd.filter((plant) => plant.id !== id));
  }

  function handleUpdatePrice(id, newPrice) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        const updatedList = pd.map((plant) =>
          plant.id === id ? updatedPlant : plant
        );
        spd(updatedList);
      });
  }

  const visiblePlants = pd.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList
        ps={visiblePlants}
        onDelete={handleDelete}
        onUpdatePrice={handleUpdatePrice}
      />
    </main>
  );
}

export default PlantPage;
