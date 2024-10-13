import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [members, setMembers] = useState([]);
  const [memberDetails, setMemberDetails] = useState({
    id: '',
    fname: '',
    lname: '',
    phone_no: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/members');
      if (response.data.Status) {
        setMembers(response.data.members);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberDetails({ ...memberDetails, [name]: value });
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
      const response = await axios.post('http://localhost:3000/api/add-member', memberDetails);
      if (response.data.Status) {
        alert('Member added successfully');
        resetForm();
        fetchMembers();  // Fetch updated member list after adding
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/update-member/${memberDetails.id}`, memberDetails);
      if (response.data.Status) {
        alert('Member updated successfully');
        resetForm();
        fetchMembers();  // Fetch updated member list after updating
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleEdit = (member) => {
    setMemberDetails(member);  // Set member details to edit
    setIsEditing(true); // Switch to edit mode
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/delete-member/${id}`);
        if (response.data.Status) {
          alert('Member deleted successfully');
          fetchMembers();  // Fetch updated member list after deleting
        }
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const resetForm = () => {
    setMemberDetails({
      id: '',
      fname: '',
      lname: '',
      phone_no: ''
    });
    setIsEditing(false); // Reset editing state
  };

  return (
    <div>
      <div className="custom-border p-3 mb-4">
        <h2><center>{isEditing ? 'Update Member' : 'Add Member'}</center></h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Id:</label>
            <input
              type="text"
              name="id"
              value={memberDetails.id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={memberDetails.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={memberDetails.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_no"
              value={memberDetails.phone_no}
              onChange={handleChange}
              required
            />
          </div>
          <center><button type="submit">{isEditing ? 'Update Member' : 'Add Member'}</button></center>
        </form>
      </div>

      <h2>Member List</h2>
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
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.fname}</td>
              <td>{member.lname}</td>
              <td>{member.phone_no}</td>
              <td>
                <button onClick={() => handleEdit(member)}>Edit</button>
                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
