import React from 'react'
import './ExerciseDisplay.css'

const ExerciseDisplay = (props) => {
    const { product } = props;

    const createMarkup = (text) => {
        return { __html: text.replace(/\n/g, '<br>') };
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-prices">
                    {product.sets} sets | {product.reps} reps
                </div>
                <div className="productdisplay-right-description" dangerouslySetInnerHTML={createMarkup(product.description)} />
                <p className='productdisplay-right-category'><span><br />Target :</span>{product.category}</p>
                <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
            </div>
        </div>
    );
}

export default ExerciseDisplay;
