import {useState, useEffect} from "react";

export const useFetch = () =>{
    //set inital states
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    
    //get data from api on load
    useEffect(()=>{    
    const getProducts = async()=>{
        try{
        setLoading(true)
        const data = await(await fetch('https://fakestoreapi.com/products')).json();
        setProducts(data)
        setLoading(false)
        }catch(err){
        setError(err)
        setLoading(false)
        }
    }
    getProducts();
    },[])

    return {products, loading, error}

}

