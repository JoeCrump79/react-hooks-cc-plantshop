import React, { useState } from "react";

function NewPlantForm({ addPlant }) {
  const [fd, sfd] = useState({
    name: "",
    image: "",
    price: 0,
  });

  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON", // test expects this exact casing
      },
      body: JSON.stringify({
        ...fd,
        price: fd.price.toString(), // test expects string
      }),
    })
      .then((r) => r.json())
      .then((np) => {
        addPlant(np);
        sfd({ name: "", image: "", price: 0 });
      });
  }

  function handleChange(e) {
    sfd({ ...fd, [e.target.name]: e.target.value });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={fd.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={fd.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={fd.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
