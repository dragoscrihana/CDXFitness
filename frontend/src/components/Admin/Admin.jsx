import React, { useState } from "react";
import "./Admin.css";
import AddExercise from "../AddExercise/AddExercise";
import ListExercise from "../ListExercise/ListExercise";
import Users from "../Users/Users";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Admin = () => {
  const [showAddExercise, setShowAddExercise] = useState(true);
  const [showListExercise, setShowListExercise] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const showAdd = () => {
    setShowAddExercise(true);
    setShowListExercise(false);
    setShowUsers(false);
  };

  const showList = () => {
    setShowAddExercise(false);
    setShowListExercise(true);
    setShowUsers(false);
  };

  const showUsersList = () => {
    setShowAddExercise(false);
    setShowListExercise(false);
    setShowUsers(true);
  };

  return (
    <div className="admin-container">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="admin">
        <Sidebar showAdd={showAdd} showList={showList} showUsers={showUsersList} />
        <div className="main-content">
          {showAddExercise && <AddExercise />}
          {showListExercise && <ListExercise />}
          {showUsers && <Users />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
