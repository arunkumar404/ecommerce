import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import "./Products.css"

const Products = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(()=>{    
    const getProducts = async()=>{
      try{
        setLoading(true)
        const data = await(await fetch('https://fakestoreapi.com/products')).json();
        setProducts(data)
        setLoading(false)
        console.log(data)
      }catch(err){
        setError(err)
        setLoading(false)
      }
    }
    getProducts();
  },[])

    if(loading){
      return (
        <div className="loading">
          <section className="loader"></section>
        </div>
      )
    }
    if(error){
      console.log(error);
    }

  return (
    <div className="allProducts">
      {products&&products.map((item)=>{
        return <ProductItem product={item} key={item.id}/>
      })}
    </div>
  )
}

export default Products