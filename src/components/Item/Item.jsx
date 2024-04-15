import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
      <p className='exercise-name'>{props.name}</p>
      <div className="item-reps">
          {props.new_price}
      </div>
    </div>
  )
}

export default Item
