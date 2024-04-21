import React from 'react'
import './RelatedExercises.css'
import exercises from '../../data/all_exercises'
import Item from '../Item/Item';

const RelatedExercises = (props) => {

    const { product } = props;

    const relatedExercises = exercises.filter(exercise => exercise.category === product.category && exercise.id !== product.id).slice(0, 4);

    return (
        <div className="related-exercises">
            <h1>Related Exercises</h1>
            <hr />
            <div className="related-exercises-list">
                <div className="relatedexercises-item">
                    {relatedExercises.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default RelatedExercises
