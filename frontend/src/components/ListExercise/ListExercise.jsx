import React, { useEffect, useState } from "react";
import "./ListExercise.css";
import cross_icon from "../../assets/cross_icon.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListExercise = () => {
  const [allexercises, setAllExercises] = useState([]);

  const notify = () => {
    toast.success('Exercise removed successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fetchInfo = () => {
    fetch('http://localhost:4000/allexercises')
      .then((res) => res.json())
      .then((data) => setAllExercises(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeExercise = async (id) => {
    await fetch('http://localhost:4000/removeexercise', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notify();
          fetchInfo();
        }
      });
  }


  return (
    <div className="listexercise">
      <h1>All Exercises List</h1>
      <div className="listexercise-format-main">
        <p>Exercises</p>
        <p>Name</p>
        <p>Sets</p>
        <p>Reps</p>
        <p>Category</p>
        <p>Description</p>
        <p>Remove</p>
      </div>
      <div className="listexercise-allexercises">
        <hr />
        {allexercises.map((e) => {
          return (
            <div key={e.id}>
              <div className="listexercise-format-main listexercise-format">
                <img className="listexercise-exercise-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>{e.sets}</p>
                <p>{e.reps}</p>
                <p>{e.category}</p>
                <p>{e.description}</p>
                <img className="listexercise-remove-icon" onClick={() => removeExercise(e.id)} src={cross_icon} alt="" />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListExercise;
