import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGenre = () => {
  const [genre, setGenre] = useState('');
  const [id, setId] = useState(''); // New state for ID
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/add-genre', { // Ensure this URL is correct
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name: genre }), // Include ID in request body
    })
      .then(response => {
        if (!response.ok) { // Handle non-200 responses
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.Status) {
          navigate('/dashboard/category'); // Navigate to genre management page
        } else {
          alert(data.Error);
        }
      })
      .catch(err => {
        console.error('Error adding genre:', err);
        alert('Error adding genre: ' + err);
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 w-25 custom-border'>
        <h2 className='text-center'>Add Genre</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='idInput'><strong>ID:</strong></label>
            <input
              type='text'
              name='id'
              id='idInput'
              placeholder='Enter ID'
              value={id}
              onChange={(e) => setId(e.target.value)}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='genreInput'><strong>Genre:</strong></label>
            <input
              type='text'
              name='genre'
              id='genreInput'
              placeholder='Enter genre'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className='form-control rounded-0'
            />
          </div>
          <div className='text-center'>
            <button 
              type='submit' 
              className='btn btn-success rounded-0' 
              style={{ width: '100%', height: '40px' }} 
            >
              Add Genre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGenre;

