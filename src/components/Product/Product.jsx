import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import all_exercises from '../../data/all_exercises'

const Product = () => {
  const {productId} = useParams();
  const product = all_exercises.find((e)=> e.id === Number(productId));
  return (
    <div>
      <ExerciseDisplay product={product}/>
      <DescriptionBox/>
    </div>
  )
}

export default Product
