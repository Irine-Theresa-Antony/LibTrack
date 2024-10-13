import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import Profile from './components/Profile';
import Category from './components/Category';
import Login from './components/Login';
import AddGenre from './components/AddGenre';
import Staff from './components/staff';
import Lending from './components/Lending';
import Home from './components/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='employee' element={<Employee />} />
          <Route path='profile' element={<Profile />} />
          <Route path='category' element={<Category />} />
          <Route path='add-genre' element={<AddGenre />} />
          <Route path='staff' element={<Staff />} />
          <Route path='lending' element={<Lending />} />
          <Route path='' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
