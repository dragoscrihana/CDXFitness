import React, { useState, useEffect } from 'react'
import './RelatedExercises.css'
import Item from '../Item/Item';

const RelatedExercises = (props) => {

    const [allexercises, setAllExercises] = useState([]);

    const { product } = props;

    const fetchInfo = () => {
        fetch('http://localhost:4000/allexercises')
            .then((res) => res.json())
            .then((data) => setAllExercises(data))
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const relatedExercises = allexercises.filter(exercise => exercise.category === product.category && exercise.id !== product.id).slice(0, 4);

    return (
        <div className="related-exercises">
            <h1>Related Exercises</h1>
            <hr />
            <div className="related-exercises-list">
                <div className="relatedexercises-item">
                    {relatedExercises.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} reps={item.reps} sets={item.sets} description={item.description} category={item.category} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default RelatedExercises
