import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure you import your CSS

const Home = () => {
  const [counts, setCounts] = useState({
    books: 0,
    genres: 0,
    members: 0,
    staff: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [booksResponse, genreResponse, membersResponse, staffResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/books/count'),
          axios.get('http://localhost:3000/api/genre/count'),
          axios.get('http://localhost:3000/api/members/count'),
          axios.get('http://localhost:3000/api/staff/count'),
        ]);

        setCounts({
          books: booksResponse.data.count,
          genres: genreResponse.data.count,
          members: membersResponse.data.count,
          staff: staffResponse.data.count,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="count-container">
        <div className="count-box">
          <h3>Books</h3>
          <p>{counts.books}</p>
        </div>
        <div className="count-box">
          <h3>Genres</h3>
          <p>{counts.genres}</p>
        </div>
        <div className="count-box">
          <h3>Members</h3>
          <p>{counts.members}</p>
        </div>
        <div className="count-box">
          <h3>Staffs</h3>
          <p>{counts.staff}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
