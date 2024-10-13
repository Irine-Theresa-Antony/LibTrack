import React, { useState, useEffect } from "react";

const Category = () => {
  const [genres, setGenres] = useState([]); // Ensure genres is initialized as an empty array
  const [newGenre, setNewGenre] = useState('');

  // Fetch genres when the component loads
  useEffect(() => {
    fetch("http://localhost:3000/api/category")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched genres data:", data); // Debugging line
        // Ensure data has the structure you expect
        if (data.Status === true && Array.isArray(data.genres)) {
          setGenres(data.genres); // Set the genres only if it's an array
        } else {
          console.error("Unexpected data format", data);
        }
      })
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // Handle adding a new genre
  const handleAddGenre = (e) => {
    e.preventDefault();
    console.log("Adding new genre:", newGenre); // Debugging line

    fetch("http://localhost:3000/api/add-genre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newGenre }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response after adding genre:", data); // Debugging line
        if (data.Status) {
          setGenres([...genres, { name: newGenre }]); // Add the new genre to the list
          setNewGenre(''); // Clear the input
        } else {
          alert(data.Error);
        }
      })
      .catch((err) => {
        console.error("Error adding genre:", err);
        alert("Error adding genre: " + err);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">Genres</h2>

      {/* Display the list of genres */}
      <ul className="list-group mb-4">
        {genres && genres.length > 0 ? ( // Safely check genres and its length
          genres.map((genre, index) => (
            <li key={index} className="list-group-item">
              {genre.name}
            </li>
          ))
        ) : (
          <li className="list-group-item">No genres available</li>
        )}
      </ul>

      {/* Form to add a new genre */}
      <div className="add-genre-form">
        <h3>Add New Genre</h3>
        <form onSubmit={handleAddGenre}>
          <div className="mb-3">
            <label htmlFor="genreInput" className="form-label">
              Genre Name
            </label>
            <input
              type="text"
              className="form-control"
              id="genreInput"
              placeholder="Enter genre name"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Genre
          </button>
        </form>
      </div>
    </div>
  );
};

export default Category;
