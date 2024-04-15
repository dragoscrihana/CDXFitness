import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import all_exercises from '../../data/all_exercises'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Product = () => {
  const {productId} = useParams();
  const product = all_exercises.find((e)=> e.id === Number(productId));
  return (
    <div className='product-container'>
      <Navbar/>
      <ExerciseDisplay product={product}/>
      <Footer/>
    </div>
  )
}

export default Product
