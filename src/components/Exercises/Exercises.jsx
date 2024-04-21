import React from 'react'
import './Exercises.css'
import Header from '../Header/Header'
import all_exercises from '../../data/all_exercises'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Exercises = (props) => {
  return (
    <div className="exercises">
      <Navbar/>
      <div className='shop-category'>
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
        </div>
        <div className="shopcategory-products">
        {all_exercises.map((item,i)=>{
          if (props.category===item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.reps} description={item.description} category={item.category}/>
          }
          else if(props.category===""){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.reps} description={item.description} category={item.category}/>
          }
          else{
            return null;
          }
        })}
        </div>
      <Footer/>
      </div>
    </div>
  )
}

export default Exercises
