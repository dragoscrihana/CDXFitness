import React, { useState, useEffect } from 'react'
import './Exercises.css'
import Item from '../Item/Item'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Pagination from '../Pagination/Pagination'

const Exercises = (props) => {
  const [allexercises, setAllExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [filteredExercises, setFilteredExercises] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredExercises.slice(firstPostIndex, lastPostIndex);

  const fetchInfo = () => {
    fetch('http://localhost:4000/allexercises')
      .then((res) => res.json())
      .then((data) => {
        setAllExercises(data);
        const filteredData = data.filter(item => item.category === props.category || props.category === "");
        setCurrentPage(1);
        setFilteredExercises(filteredData);
      });
  }

  useEffect(() => {
    fetchInfo();
  }, [props.category])

  return (
    <div className="exercises">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className='shop-category'>
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing {firstPostIndex + 1}-{lastPostIndex}</span> out of {filteredExercises.length} exercises
          </p>
        </div>
        <div className="shopcategory-products">
          {currentPosts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} reps={item.reps} sets={item.sets} description={item.description} category={item.category} />
          ))}
        </div>
        <Pagination totalPosts={filteredExercises.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <Footer />
      </div>
    </div>
  )
}

export default Exercises
