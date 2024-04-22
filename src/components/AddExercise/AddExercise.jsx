import React, { useState } from "react";
import "./AddExercise.css";
import upload_area from "../../assets/upload_area.svg";

const AddExercise = () => {
  const [image, setImage] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState({
    name: "",
    image: "",
    category: "chest",
    sets: "",
    reps: "",
    description: ""
  });

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
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="biceps">Biceps</option>
          <option value="triceps">Triceps</option>
          <option value="legs">Legs</option>
          <option value="shoulders">Shoulders</option>
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
      <button className="addexercise-btn" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddExercise;
