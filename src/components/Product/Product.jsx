import React from 'react'
import { useParams } from 'react-router-dom';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import all_exercises from '../../data/all_exercises'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Product.css'
import RelatedExercises from '../RelatedExercises/RelatedExercises';

const Product = () => {
  const {productId} = useParams();
  const product = all_exercises.find((e)=> e.id === Number(productId));
  return (
    <div className='product-container'>
      <Navbar/>
      <ExerciseDisplay product={product}/>
      <RelatedExercises product={product}/>
      <Footer/>
    </div>
  )
}

export default Product
