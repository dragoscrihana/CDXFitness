import React from 'react'
import './Exercises.css'
import Header from '../Header/Header'
import all_exercises from '../../data/all_exercises'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'

const Exercises = (props) => {
  return (
    <div className="exercises">
      <Header />
      <div className='shop-category'>
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
        </div>
        <div className="shopcategory-products">
        {all_exercises.map((item,i)=>{
          if (props.category===item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      </div>
    </div>
  )
}

export default Exercises
