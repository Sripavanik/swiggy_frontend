import React,{useState,useEffect} from 'react'
import {API_URL} from '../data/ApiPath';
const AllProducts = () => {
    const [products,setProducts]=useState("");
    const deleteProductById=async(productId)=>{
        try{
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE'
            });
            if(response.ok){
                setProducts(products.filter(product=>product._id!==productId));
                alert("product deleted successfully");
            }
        }
        catch(error){
            console.error("failed to delete");
            alert("Failed to delete the product");
        }
    }
    const productsHandler=async()=>{
        const firmId=localStorage.getItem('firmId');
        try{
            const response=await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData=await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData);
        }
        catch(error){
            console.error("failed to fetch products",error);
            alert("failed to fetch products")
        }
    }
    useEffect(()=>{
        productsHandler();
        console.log("this is useEffect")
    },[])
  return (
    <div>
        {!products?(
            <p>No Products Added</p>
        ):(
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ProductName</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        return (
                            <>
                            <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td>
                                {item.image && (
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} style={{width:'50px',height:'50px'}}/>
                                )}
                            </td>
                            <td>
                                <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                            </td>
                            </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts