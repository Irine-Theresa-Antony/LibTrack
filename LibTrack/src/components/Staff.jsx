import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Staff.css'; // Import your CSS file here

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [id, setId] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [editingId, setEditingId] = useState(null); // To track the staff member being edited

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/staff');
      setStaff(response.data.staff);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const addStaff = async () => {
    try {
      await axios.post('http://localhost:3000/api/add-staff', { id, fname, lname, phone_no });
      fetchStaff();
      resetForm();
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  const updateStaff = async () => {
    try {
      await axios.put(`http://localhost:3000/api/update-staff/${editingId}`, { fname, lname, phone_no });
      fetchStaff();
      resetForm();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const resetForm = () => {
    setId('');
    setFname('');
    setLname('');
    setPhoneNo('');
    setEditingId(null);
  };

  const handleEdit = (staffMember) => {
    setEditingId(staffMember.id);
    setFname(staffMember.fname);
    setLname(staffMember.lname);
    setPhoneNo(staffMember.phone_no);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateStaff();
    } else {
      addStaff();
    }
  };

  return (
    <div>
      <h2>Staff Management</h2>
      
      {/* Form Container */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            disabled={editingId !== null} // Disable ID input during editing
          />
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone_no}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={resetForm}>Cancel Edit</button>}
        </form>
      </div>

      <h3>Staff List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember.id}>
              <td>{staffMember.id}</td>
              <td>{staffMember.fname}</td>
              <td>{staffMember.lname}</td>
              <td>{staffMember.phone_no}</td>
              <td>
                <button onClick={() => handleEdit(staffMember)}>Edit</button>
                <button onClick={() => deleteStaff(staffMember.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;
