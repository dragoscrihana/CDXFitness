import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Product.css'
import RelatedExercises from '../RelatedExercises/RelatedExercises';

const Product = () => {
  const { productId } = useParams();

  const [allexercises, setAllExercises] = useState([]);

  const fetchInfo = () => {
    fetch('http://localhost:4000/allexercises')
      .then((res) => res.json())
      .then((data) => setAllExercises(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const product = allexercises.find((e) => e.id === Number(productId));
  return (
    <div className='product-container'>
      <div className="navbar-container">
        <Navbar />
      </div>
      {product ? (
        <>
          <ExerciseDisplay product={product} />
          <RelatedExercises product={product} />
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  )
}

export default Product
