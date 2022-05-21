import { useEffect, useState } from 'react';
import './App.css';
import Products from './Products';
import Sidebar from './Sidebar';
import { useFetch } from './useFetch';

function App() {

const {products, loading, error} = useFetch();
const [finalItems, setFinalItems] = useState(products)

 const initialFilterState = {
    category:[],
    price:"",
    rating:""
  }
  const [filters, setFilters] = useState(initialFilterState)
  
  useEffect(()=>{
    setFinalItems(products)
  },[products])
  
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

  },[filters])

  return (
    <div className="App">
      <Sidebar filters={filters} setFilters={setFilters}/>
      <Products filteredProducts={finalItems} loading={loading} error={error} />
    </div>
  );
}

export default App;
