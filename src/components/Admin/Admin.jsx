import React, { useState } from "react";
import "./Admin.css";
import AddExercise from "../AddExercise/AddExercise";
import ListExercise from "../ListExercise/ListExercise";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Admin = () => {
  const [showAddExercise, setShowAddExercise] = useState(true);

  const showAdd = () => {
    setShowAddExercise(true);
  };

  const showList = () => {
    setShowAddExercise(false);
  };

  return (
    <div className="admin-container">
      <Navbar/>
      <div className="admin">
        <Sidebar showAdd={showAdd} showList={showList} />
        <div className="main-content">
          {showAddExercise ? <AddExercise /> : <ListExercise />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
