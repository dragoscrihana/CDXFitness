import React, { useEffect, useState } from "react";
import "./ListExercise.css";
import all_exercises from '../../data/all_exercises'
import cross_icon from "../../assets/cross_icon.png"

const ListExercise = () => {
  const [allexercises, setAllExercises] = useState([]);

  useEffect(() => {
    setAllExercises(all_exercises);
  }, []);

  const removeExercise = (id) => {
    const updatedProducts = allexercises.filter((exercise) => exercise.id !== id);
    setAllExercises(updatedProducts);
  };

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
