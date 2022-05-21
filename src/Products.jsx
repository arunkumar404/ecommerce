import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import "./Products.css";

const Products = ({filteredProducts, loading, error}) => {

    const [sort, setSort] = useState("")

    const [sortedProducts, setSortedProducts] = useState([])

     useEffect(()=>{
        setSortedProducts(filteredProducts)
      },[filteredProducts])

      useEffect(()=>{
        let sortArray = []
        if(sort==="price low to high"){
          sortArray = filteredProducts.sort((a,b)=>{
            return a.price-b.price
        })
          setSortedProducts([...sortArray])
        }
        if(sort==="price high to low"){
          sortArray = filteredProducts.sort((a,b)=>{
            return b.price-a.price
        })
          setSortedProducts([...sortArray])
        }
        if(sort==="rating low to high"){
          sortArray = filteredProducts.sort((a,b)=>{
            return a.rating.rate-b.rating.rate
        })
          setSortedProducts([...sortArray])
        }
        if(sort==="rating high to low"){
          sortArray = filteredProducts.sort((a,b)=>{
            return b.rating.rate-a.rating.rate
        })
          setSortedProducts([...sortArray])
        }
      },[sort,filteredProducts])

    const handleChange = (e) =>{
      setSort(e.target.value)
    }

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
    <div className="productsContainer">
      <div className="sortBar">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" name="sort" onChange={(handleChange)} value={sort}>
        <option value="">Select an option</option>
        <option value="price low to high">Price: Low to High</option>
        <option value="price high to low">Price: High to Low</option>
        <option value="rating low to high">Rating: Low to High</option>
        <option value="rating high to low">Rating: High to Low</option>
        </select>
      </div>
      <div className="allProducts">
        {sortedProducts.length>0&&sortedProducts.map((item)=>{
          return <ProductItem product={item} key={item.id}/>
        })}
        {sortedProducts.length<1&&
        <div className="emptyList">
          No items match your search. <br/>Please change your filters or visit after some time.
        </div>
        }
      </div>
    </div>
  )
}

export default Products