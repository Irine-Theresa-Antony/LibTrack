import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Ensure you import your CSS

const Lending = () => {
  const [lendingData, setLendingData] = useState({
    id: '', // Add id to lendingData
    member_id: '',
    book_id: '',
    lending_date: '',
    return_date: ''
  });

  const [lendings, setLendings] = useState([]);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await Promise.all([fetchLendings(), fetchMembers(), fetchBooks()]);
      setLoading(false); // End loading
    };
    fetchData();
  }, []);

  const fetchLendings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/lending');
      setLendings(response.data.lendings || []);
    } catch (error) {
      console.error('Error fetching lending data:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/members');
      setMembers(response.data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const resetForm = () => {
    setLendingData({
      id: '', // Reset id field
      member_id: '',
      book_id: '',
      lending_date: '',
      return_date: ''
    });
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lendingPayload = {
      ...lendingData,
      return_date: lendingData.return_date ? lendingData.return_date : null,
    };

    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/lending/${lendingData.id}`, lendingPayload);
      } else {
        await axios.post('http://localhost:3000/api/lending', lendingPayload);
      }
      fetchLendings();
      resetForm();
    } catch (error) {
      console.error('Error saving lending data:', error);
    }
  };

  const handleEdit = (lending) => {
    setLendingData({
      id: lending.id, // Set id when editing
      member_id: lending.member_id,
      book_id: lending.book_id,
      lending_date: lending.lending_date,
      return_date: lending.return_date || ''
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lending/${id}`);
      fetchLendings();
    } catch (error) {
      console.error('Error deleting lending record:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const calculateFine = (lending_date, return_date) => {
    const lendingDate = new Date(lending_date);
    const returnDate = return_date ? new Date(return_date) : new Date();
    const differenceInDays = Math.floor((returnDate - lendingDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays > 30) {
      return (differenceInDays - 30);
    }
    return 0;
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <h2>Lending Management</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={lendingData.id}
              onChange={(e) => setLendingData({ ...lendingData, id: e.target.value })} // Handle ID input
              required
            />
          </div>
          <div>
            <label>Member ID:</label>
            <select
              value={lendingData.member_id}
              onChange={(e) => setLendingData({ ...lendingData, member_id: e.target.value })}
              required
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} (ID: {member.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Book:</label>
            <select
              value={lendingData.book_id}
              onChange={(e) => setLendingData({ ...lendingData, book_id: e.target.value })}
              required
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} (ID: {book.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Lending Date:</label>
            <input
              type="date"
              value={lendingData.lending_date}
              onChange={(e) => setLendingData({ ...lendingData, lending_date: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Return Date (optional):</label>
            <input
              type="date"
              value={lendingData.return_date}
              onChange={(e) => setLendingData({ ...lendingData, return_date: e.target.value })}
            />
          </div>
          <button type="submit">{editMode ? 'Update' : 'Add'} Lending Record</button>
          {editMode && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <h3>Lending Records</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Member</th>
            <th>Book</th>
            <th>Lending Date</th>
            <th>Return Date</th>
            <th>Fine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lendings.map((lending) => (
            <tr key={lending.id}>
              <td>{lending.id}</td>
              <td>{members.find(m => m.id === lending.member_id)?.name || lending.member_id}</td>
              <td>{books.find(b => b.id === lending.book_id)?.title || lending.book_id}</td>
              <td>{formatDate(lending.lending_date)}</td>
              <td>{lending.return_date ? formatDate(lending.return_date) : 'Not returned'}</td>
              <td>{calculateFine(lending.lending_date, lending.return_date)} rupees</td>
              <td>
                <button onClick={() => handleEdit(lending)}>Edit</button>
                <button onClick={() => handleDelete(lending.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lending;
