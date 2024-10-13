import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employee = () => {
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    publisher: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchGenres();
    fetchBooks();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/category');
      if (response.data.Status) {
        setGenres(response.data.genres);
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      if (response.data.Status) {
        setBooks(response.data.books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/add-book', bookDetails);
      if (response.data.Status) {
        alert('Book added successfully');
        await fetchBooks(); // Fetch updated book list after adding
        resetForm();
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/update-book/${bookDetails.id}`, bookDetails);
      if (response.data.Status) {
        alert('Book updated successfully');
        await fetchBooks(); // Fetch updated book list after updating
        resetForm();
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/delete-book/${id}`);
        if (response.data.Status) {
          alert('Book deleted successfully');
          await fetchBooks(); // Fetch updated book list after deleting
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleEdit = (book) => {
    setBookDetails(book); // Populate form with selected book's details
    setIsEditing(true);
  };

  const resetForm = () => {
    setBookDetails({
      id: '',
      title: '',
      author: '',
      genre: '',
      publisher: ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="custom-border p-3 mb-4">
        <center><h2>{isEditing ? 'Edit Book' : 'Add Book'}</h2></center>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Id:</label>
            <input
              type="text"
              name="id"
              value={bookDetails.id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={bookDetails.author}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Genre:</label>
            <select
              name="genre"
              value={bookDetails.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Publisher:</label>
            <input
              type="text"
              name="publisher"
              value={bookDetails.publisher}
              onChange={handleChange}
              required
            />
          </div>
          <center><button type="submit">{isEditing ? 'Update Book' : 'Add Book'}</button></center>
        </form>
      </div>

      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publisher}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
