import React, { useState, useEffect } from "react";

const GenreManagement = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ id: '', name: '' }); // Adjusted to store both id and name
  const [editingGenreId, setEditingGenreId] = useState(null);

  // Fetch genres when the component loads
  useEffect(() => {
    fetch("http://localhost:3000/api/category")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Status === true && Array.isArray(data.genres)) {
          setGenres(data.genres);
        } else {
          console.error("Unexpected data format", data);
        }
      })
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // Handle adding a new genre
  const handleAddGenre = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/add-genre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: newGenre.id, name: newGenre.name }), // Send both id and name
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Status) {
          setGenres((prevGenres) => [...prevGenres, newGenre]); // Add new genre to the list
          setNewGenre({ id: '', name: '' }); // Clear the input fields
        } else {
          alert(data.Error);
        }
      })
      .catch((err) => {
        console.error("Error adding genre:", err);
        alert("Error adding genre: " + err);
      });
  };

  // Handle editing a genre
  const handleEditGenre = (id) => {
    const genreToEdit = genres.find(genre => genre.id === id);
    if (genreToEdit) {
      setNewGenre({ id: genreToEdit.id, name: genreToEdit.name }); // Set both id and name for editing
      setEditingGenreId(id);
    }
  };

  // Handle updating a genre
  const handleUpdateGenre = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/update-genre/${editingGenreId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: newGenre.id, name: newGenre.name }), // Send both id and name
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Status) {
          setGenres((prevGenres) => prevGenres.map(genre => 
            genre.id === editingGenreId ? { ...genre, name: newGenre.name } : genre
          ));
          setNewGenre({ id: '', name: '' }); // Clear the input fields
          setEditingGenreId(null);
        } else {
          alert(data.Error);
        }
      })
      .catch((err) => {
        console.error("Error updating genre:", err);
        alert("Error updating genre: " + err);
      });
  };

  // Handle deleting a genre
  const handleDeleteGenre = (id) => {
    fetch(`http://localhost:3000/api/delete-genre/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Status) {
          setGenres((prevGenres) => prevGenres.filter(genre => genre.id !== id));
        } else {
          alert(data.Error);
        }
      })
      .catch((err) => {
        console.error("Error deleting genre:", err);
        alert("Error deleting genre: " + err);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">Genre Management</h2>

      {/* Form inside the bordered container */}
      <div className="custom-border p-3 mb-4">
        <form onSubmit={editingGenreId ? handleUpdateGenre : handleAddGenre}>
          <div className="mb-3">
            <label htmlFor="genreIdInput" className="form-label">Genre ID</label>
            <input
              type="text"
              className="form-control"
              id="genreIdInput"
              placeholder="Enter genre ID"
              value={newGenre.id}
              onChange={(e) => setNewGenre({ ...newGenre, id: e.target.value })} // Update id
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genreInput" className="form-label">Genre Name</label>
            <input
              type="text"
              className="form-control"
              id="genreInput"
              placeholder="Enter genre name"
              value={newGenre.name}
              onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })} // Update name
              required
            />
          </div>
          <center><button type="submit" className="btn btn-primary">
            {editingGenreId ? "Update Genre" : "Add Genre"}
          </button></center>
        </form>
      </div>

      <h2>Genre List</h2>
      {/* Table for genre list */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Genre ID</th>
              <th scope="col">Genre Name</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.length > 0 ? (
              genres.map((genre) => (
                <tr key={genre.id}>
                  <td>{genre.id}</td>
                  <td>{genre.name}</td>
                  <td className="text-center">
                    <button onClick={() => handleEditGenre(genre.id)} className="btn btn-warning btn-sm me-2">Edit</button>
                    <button onClick={() => handleDeleteGenre(genre.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No genres available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenreManagement;
