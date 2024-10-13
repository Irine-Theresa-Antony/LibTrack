import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin Login Route
router.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ Status: false, Error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  con.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.length > 0) {
      const token = jwt.sign({ id: result[0].id }, 'secret', { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }).json({ Status: true, Message: 'Login successful' });
    } else {
      res.status(401).json({ Status: false, Message: 'Invalid email or password' });
    }
  });
});

// Fetch all genres route
router.get('/category', (req, res) => {
  const sql = 'SELECT * FROM genre';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.length > 0) {
      return res.status(200).json({ Status: true, genres: result });
    } else {
      return res.status(404).json({ Status: false, Message: 'No genres found' });
    }
  });
});

// Add new genre route
router.post('/add-genre', (req, res) => {
  const { id, name } = req.body; // Require id and name

  if (!name) {
    return res.status(400).json({ Status: false, Error: 'Genre name is required' });
  }

  const sql = 'INSERT INTO genre (id, name) VALUES (?, ?)'; // Insert ID and name
  con.query(sql, [id, name], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.status(201).json({ Status: true, Message: 'Genre added successfully' });
  });
});


// Update genre route
router.put('/update-genre/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return res.status(400).json({ Status: false, Error: 'Genre name is required' });
  }

  const sql = 'UPDATE genre SET name = ? WHERE id = ?';
  con.query(sql, [name, id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: 'Genre updated successfully' });
    } else {
      return res.status(404).json({ Status: false, Message: 'Genre not found' });
    }
  });
});

// Delete genre route
router.delete('/delete-genre/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM genre WHERE id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: 'Genre deleted successfully' });
    } else {
      return res.status(404).json({ Status: false, Message: 'Genre not found' });
    }
  });
});

// Add new book route
router.post('/add-book', (req, res) => {
  const { id, title, author, genre, publisher } = req.body;

  if (!id || !title || !author || !genre || !publisher) {
    return res.status(400).json({ Status: false, Error: 'All fields are required' });
  }

  const sql = 'INSERT INTO books (id, title, author, genre, publisher) VALUES (?, ?, ?, ?, ?)';
  con.query(sql, [id, title, author, genre, publisher], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.status(201).json({ Status: true, Message: 'Book added successfully' });
  });
});

// Fetch all books route
router.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.length > 0) {
      return res.status(200).json({ Status: true, books: result });
    } else {
      return res.status(404).json({ Status: false, Message: 'No books found' });
    }
  });
});

// Update book route
router.put('/update-book/:id', (req, res) => {
  const { id, title, author, genre, publisher } = req.body;
  const sql = 'UPDATE books SET id=?, title = ?, author = ?, genre = ?, publisher = ? WHERE id = ?';
  
  con.query(sql, [id, title, author, genre, publisher, req.params.id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: 'Book updated successfully' });
    } else {
      return res.status(404).json({ Status: false, Message: 'Book not found' });
    }
  });
});

// Delete book route
router.delete('/delete-book/:id', (req, res) => {
  const sql = 'DELETE FROM books WHERE id = ?';
  
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: 'Book deleted successfully' });
    } else {
      return res.status(404).json({ Status: false, Message: 'Book not found' });
    }
  });
});

// Add new member route
router.post('/add-member', (req, res) => {
  const { id, fname, lname, phone_no } = req.body;

  if (!id || !fname || !lname || !phone_no) {
    return res.status(400).json({ Status: false, Error: 'All fields are required' });
  }

  const sql = 'INSERT INTO members (id, fname, lname, phone_no) VALUES (?, ?, ?, ?)';
  con.query(sql, [id, fname, lname, phone_no], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.status(201).json({ Status: true, Message: 'Member added successfully' });
  });
});

// Fetch all members route
router.get('/members', (req, res) => {
  const sql = 'SELECT * FROM members';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.length > 0) {
      return res.status(200).json({ Status: true, members: result });
    } else {
      return res.status(404).json({ Status: false, Message: 'No members found' });
    }
  });
});

// Update member route
router.put('/update-member/:id', (req, res) => {
  const { id } = req.params;
  const { fname, lname, phone_no } = req.body;

  if (!fname || !lname || !phone_no) {
    return res.status(400).json({ Status: false, Error: 'All fields are required' });
  }

  const sql = 'UPDATE members SET fname = ?, lname = ?, phone_no = ? WHERE id = ?';
  con.query(sql, [fname, lname, phone_no, id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Message: 'Member not found' });
    }
    return res.status(200).json({ Status: true, Message: 'Member updated successfully' });
  });
});

// Delete member route
router.delete('/delete-member/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM members WHERE id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Message: 'Member not found' });
    }
    return res.status(200).json({ Status: true, Message: 'Member deleted successfully' });
  });
});


// Fetch all staff
router.get('/staff', (req, res) => {
  const sql = 'SELECT * FROM staff';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.status(200).json({ Status: true, staff: result });
  });
});

// Add new staff
router.post('/add-staff', (req, res) => {
  const { id, fname, lname, phone_no } = req.body;
  const sql = 'INSERT INTO staff (id, fname, lname, phone_no) VALUES (?, ?, ?, ?)';
  con.query(sql, [id, fname, lname, phone_no], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.status(201).json({ Status: true, Message: 'Staff added successfully' });
  });
});

// Update staff details
router.put('/update-staff/:id', (req, res) => {
  const { fname, lname, phone_no } = req.body;
  const sql = 'UPDATE staff SET fname = ?, lname = ?, phone_no = ? WHERE id = ?';
  con.query(sql, [fname, lname, phone_no, req.params.id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.json({ Status: true, Message: 'Staff updated successfully' });
  });
});

// Delete staff
router.delete('/delete-staff/:id', (req, res) => {
  const sql = 'DELETE FROM staff WHERE id = ?';
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    return res.json({ Status: true, Message: 'Staff deleted successfully' });
  });
});

// Fetch all lending records
router.get('/lending', (req, res) => {
  const sql = `SELECT l.*, 
               CASE 
                 WHEN l.return_date IS NULL THEN DATEDIFF(CURDATE(), l.lending_date) 
                 ELSE DATEDIFF(l.return_date, l.lending_date) 
               END AS fine_days, 
               GREATEST(0, CASE 
                 WHEN DATEDIFF(CURDATE(), l.lending_date) > 30 THEN DATEDIFF(CURDATE(), l.lending_date) - 30
                 ELSE 0 
               END) AS fine
               FROM lending l`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    res.json({ Status: true, lendings: result });
  });
});

// Add lending record
router.post('/lending', (req, res) => {
  const { id, member_id, book_id, lending_date, return_date } = req.body;

  const sql = 'INSERT INTO lending (id, member_id, book_id, lending_date, return_date) VALUES (?, ?, ?, ?, ?)';
  con.query(sql, [id, member_id, book_id, lending_date, return_date], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    res.status(201).json({ Status: true, Message: 'Lending record added successfully' });
  });
});

// Update lending record
router.put('/lending/:id', (req, res) => {
  const { member_id, book_id, lending_date, return_date } = req.body;
  const sql = 'UPDATE lending SET member_id = ?, book_id = ?, lending_date = ?, return_date = ? WHERE id = ?';
  con.query(sql, [member_id, book_id, lending_date, return_date, req.params.id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    res.json({ Status: true, Message: 'Lending record updated successfully' });
  });
});

// Delete lending record
router.delete('/lending/:id', (req, res) => {
  const sql = 'DELETE FROM lending WHERE id = ?';
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('SQL error:', err);
      return res.status(500).json({ Status: false, Error: 'Database query error' });
    }
    res.json({ Status: true, Message: 'Lending record deleted successfully' });
  });
});

// Get count of books
router.get('/books/count', (req, res) => {
  const sql = 'SELECT COUNT(id) AS count FROM books'; // Counting the number of IDs
  con.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ count: result[0].count });
  });
});


router.get('/genre/count', (req, res) => {
  console.log('Fetching genre count...');
  const sql = 'SELECT COUNT(*) AS count FROM genre';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ count: result[0].count });
  });
});




// Get count of members
router.get('/members/count', (req, res) => {
  const sql = 'SELECT COUNT(id) AS count FROM members'; // Counting the number of IDs
  con.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ count: result[0].count });
  });
});


// Get count of staff
router.get('/staff/count', (req, res) => {
  const sql = 'SELECT COUNT(id) AS count FROM staff'; // Counting the number of IDs
  con.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ count: result[0].count });
  });
});


export { router as adminrouter };

