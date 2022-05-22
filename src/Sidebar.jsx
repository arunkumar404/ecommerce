import React from 'react';
import "./Sidebar.css";
import { useFetch } from './useFetch';

const Sidebar = ({filters, setFilters}) => {

  //get all products  using custom hook
  const {products} = useFetch();

  //get all distinct categories for filter
  var distinctCategories = []
  for (let i = 0; i < products.length; i++){
    if (!distinctCategories.includes(products[i].category))
        distinctCategories.push(products[i].category)
      }

  //category filter selection handler
  const handleCheckChange = (e) =>{
    if(filters.category.includes(e.target.value)){
      setFilters({
        ...filters,
        [e.target.name]:[...(filters.category.filter((item)=>{
          return item!==e.target.value
        }))]
      })
    }
    else{
      setFilters({
        ...filters,
        [e.target.name]:[...filters.category,e.target.value]
      })
    }
  }

  //other filter change handler
  const handleChange = (e) =>{
    setFilters({
      ...filters,
      [e.target.name]:e.target.value
    })
  }

  return (
    <div className="sideBar">
      <p className="filterHead">Filter by</p>
      <div className="filter">Category</div>
      {
      distinctCategories&&distinctCategories.map((category,index)=>{
        return <div key={index}>
          <input type="checkbox" id={category} name="category" value={category} checked={filters.category.includes(category)} onChange={handleCheckChange}/>  
          <label htmlFor={category}> {category} </label>
          <br/>
        </div>
      })
      }
      <div className="filter">Price</div>
        <input type="radio" id="below100" name="price" value="below100" checked={filters.price==="below100"} onChange={handleChange}/>  
        <label htmlFor="below100"> Below 100</label>
        <br/>
        <input type="radio" id="100to500" name="price" value="100to500" checked={filters.price==="100to500"} onChange={handleChange}/>  
        <label htmlFor="100to500"> 100 to 500</label>
        <br/>
        <input type="radio" id="above500" name="price" value="above500" checked={filters.price==="above500"} onChange={handleChange}/>  
        <label htmlFor="above500"> Above 500</label>

      <div className="filter">Rating</div>
          <input type="radio" id="rating4" name="rating" value={4} checked={filters.rating==="4"} onChange={handleChange}/>  
          <label htmlFor="rating4"> 4 & above</label>
          <br/>
          <input type="radio" id="rating3" name="rating" value={3} checked={filters.rating==="3"} onChange={handleChange}/>  
          <label htmlFor="rating3"> 3 & above</label>
          <br/>
          <input type="radio" id="rating2" name="rating" value={2} checked={filters.rating==="2"} onChange={handleChange}/>  
          <label htmlFor="rating2"> 2 & above</label>
          <br/>
          <input type="radio" id="rating1" name="rating" value={1} checked={filters.rating==="1"} onChange={handleChange}/>  
          <label htmlFor="rating1"> 1 & above</label>
          <br/>
    </div>
  )
}

export default Sidebar;