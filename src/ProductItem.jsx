import React from 'react'
import "./ProductItem.css"

const ProductItem = ({product}) => {
    const {title, price, image} = product
    const {rate} = product.rating
  return (
    <div className="product">
        <div className="productInfo">
            <p className="productTitle">{title.slice(0,50)}{title.length>50&&"..."}</p>
            <p className="productPrice">
                <small>₹ </small>
                <strong>{price}</strong>
            </p>
            <div className="productRating">
                {Array(Math.floor(rate)).fill().map((_,i)=>{
                    return <p key={i}>⭐</p>
                })}
            </div>
        </div>
        <img src={image} alt={`image_${title}`} />
        <button>Add to basket</button>
    </div>
  )
}

export default ProductItem