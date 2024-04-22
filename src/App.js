import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Exercises from './components/Exercises/Exercises';
import Product from './components/Product/Product';
import MainPage from './components/MainPage/MainPage';
import Admin from './components/Admin/Admin';
import AddExercise from './components/AddExercise/AddExercise';
import ListExercise from './components/ListExercise/ListExercise';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addproduct" element={<AddExercise />} />
        <Route path="/admin/listproduct" element={<ListExercise />} />
        <Route path='/exercises' element={<Exercises category="" />} />
        <Route path='/chest' element={<Exercises category="Chest"/>}/>
        <Route path='/back' element={<Exercises category="Back"/>}/>
        <Route path='/biceps' element={<Exercises category="Biceps"/>}/>
        <Route path='/triceps' element={<Exercises category="Triceps"/>}/>
        <Route path='/legs' element={<Exercises category="Legs"/>}/>
        <Route path='/shoulders' element={<Exercises category="Shoulders"/>}/>
        <Route path="/product" element={<Product />}>
          <Route path=':productId' element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
