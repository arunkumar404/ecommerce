import { useEffect, useState } from 'react';

import './App.css';
import Products from './Products';
import Sidebar from './Sidebar';

//custom hook for fetching data
import { useFetch } from './useFetch';

function App() {

  //get data from api using custom hook
const {products, loading, error} = useFetch();

//state for filtered list
const [finalItems, setFinalItems] = useState(products)

 const initialFilterState = {
    category:[],
    price:"",
    rating:""
  }
  const [filters, setFilters] = useState(initialFilterState)
  
  //set list with all products
  useEffect(()=>{
    setFinalItems(products)
  },[products])
  

  //filter the list when chage in filter options
  useEffect(()=>{
    let filteredProducts = products;

    if(filters.category.length>0){
      filteredProducts = filteredProducts.filter((item)=>{
        return filters.category.includes(item.category)
      })
    }
    if(filters.price){
      if(filters.price==="below100"){
        filteredProducts = filteredProducts.filter((item)=>{
          return item.price<100
        })
      }
      if(filters.price==="100to500"){
        filteredProducts = filteredProducts.filter((item)=>{
          return item.price>=100 && item.price<=500
        })
        
      }
      if(filters.price==="above500"){
        filteredProducts = filteredProducts.filter((item)=>{
          return item.price>500
        })

      }

    }
    if(filters.rating){
      filteredProducts = filteredProducts.filter((item)=>{
        return item.rating.rate>filters.rating
      })
    }

    setFinalItems(filteredProducts)

  },[filters,products])

  return (
    <div className="App">
      <Sidebar filters={filters} setFilters={setFilters}/>
      <Products filteredProducts={finalItems} loading={loading} error={error} />
    </div>
  );
}

export default App;
