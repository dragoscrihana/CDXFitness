import React, { useState } from "react";
import "./AddExercise.css";
import upload_area from "../../assets/upload_area.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExercise = () => {
  const [image, setImage] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState({
    name: "",
    image: "",
    category: "Chest",
    sets: "",
    reps: "",
    description: ""
  });

  const notify = (message) => {
    toast.success(message, {
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

  const notify_error = () => {
    console.log("failure");
    toast.error('Failed to add exercise!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const AddExercise = async (e) => {
    e.preventDefault();
    let dataObj;
    let exercise = exerciseDetails;

    let formData = new FormData();
    formData.append('exercise', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });
    if (dataObj.success) {
      exercise.image = dataObj.image_url;
      console.log(exercise);
      await fetch('http://localhost:4000/addexercise', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      })
        .then((resp) => resp.json())
        .then((data) => { data.success ? notify('Exercise added successfully!') : notify_error() });

    }
    else {
      notify_error();
    }
  }

  const changeHandler = (e) => {
    setExerciseDetails({ ...exerciseDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="addexercise">
      <div className="addexercise-itemfield">
        <p>Exercise name</p>
        <input
          type="text"
          name="name"
          value={exerciseDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addexercise-price">
        <div className="addexercise-itemfield">
          <p>Sets</p>
          <input
            type="text"
            name="sets"
            value={exerciseDetails.sets}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addexercise-itemfield">
          <p>Reps</p>
          <input
            type="text"
            name="reps"
            value={exerciseDetails.reps}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addexercise-itemfield">
        <p>Exercise category</p>
        <select
          value={exerciseDetails.category}
          name="category"
          className="addexercise-selector"
          onChange={changeHandler}
        >
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Legs">Legs</option>
          <option value="Shoulders">Shoulders</option>
        </select>
      </div>
      <div className="addexercise-itemfield">
        <p>Exercise description</p>
        <textarea
          name="description"
          value={exerciseDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
          className="addexercise-textarea"
        />
      </div>
      <div className="addexercise-itemfield">
        <p>Exercise image</p>
        <label for="file-input">
          <img
            className="addexercise-thumbnail-img"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
          />
        </label>
        <input
          onChange={(e) => {
            imageHandler(e);
          }}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button className="addexercise-btn" onClick={(e) => { AddExercise(e) }}>ADD</button>
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
  );
};

export default AddExercise;
