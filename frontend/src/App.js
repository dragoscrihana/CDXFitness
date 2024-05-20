import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Exercises from './components/Exercises/Exercises';
import Product from './components/Product/Product';
import MainPage from './components/MainPage/MainPage';
import Admin from './components/Admin/Admin';
import AddExercise from './components/AddExercise/AddExercise';
import ListExercise from './components/ListExercise/ListExercise';
import CreditCard from './components/Card/CreditCard';
import Contact from './components/Contact/Contact';
import UserSettings from './components/UserSettings/UserSettings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const authToken = localStorage.getItem("auth-token");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:4000/isadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken }),
      });

      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      
      console.log(isLoggedIn);
      if (data.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error fetching admin info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Sau orice componentă de încărcare
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={isLoggedIn ? <CreditCard /> : <Navigate to="/" />} />
        <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />} />
        <Route path='/user/:activepage' element={isLoggedIn ? <UserSettings /> : <Navigate to="/" />} />
        <Route path="/admin/addproduct" element={isAdmin ? <AddExercise /> : <Navigate to="/" />} />
        <Route path="/admin/listproduct" element={isAdmin ? <ListExercise /> : <Navigate to="/" />} />
        <Route path='/exercises' element={isLoggedIn ? <Exercises category="" /> : <Navigate to="/" />} />
        <Route path='/chest' element={isLoggedIn ? <Exercises category="Chest" /> : <Navigate to="/" />} />
        <Route path='/back' element={isLoggedIn ? <Exercises category="Back" /> : <Navigate to="/" />} />
        <Route path='/biceps' element={isLoggedIn ? <Exercises category="Biceps" /> : <Navigate to="/" />} />
        <Route path='/triceps' element={isLoggedIn ? <Exercises category="Triceps" /> : <Navigate to="/" />} />
        <Route path='/legs' element={isLoggedIn ? <Exercises category="Legs" /> : <Navigate to="/" />} />
        <Route path='/shoulders' element={isLoggedIn ? <Exercises category="Shoulders" /> : <Navigate to="/" />} />
        <Route path="/product" element={isLoggedIn ? <Product /> : <Navigate to="/" />}>
          <Route path=':productId' element={isLoggedIn ? <Product /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
