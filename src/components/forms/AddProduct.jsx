import React ,{useState} from 'react'
import {API_URL} from '../../data/ApiPath';
const AddProduct = () => {
  const [productName,setproductName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription]=useState("");
  const handleBestSeller=(event)=>{
    const value=event.target.value==='true';
    setBestSeller(value);
  }
  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value))
    }
    else{
       setCategory([...category,value])
    }
  }
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage)
  }
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
        const loginToken = localStorage.getItem('loginToken');
        const firmId = localStorage.getItem('firmId');
        if (!loginToken || !firmId) {
            console.error("User not authenticated");
            alert("User not authenticated or firm ID missing");
            return;
        }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        category.forEach((value) => {
            formData.append('category', value);
        });

        const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
            method: 'POST',
            body: formData,
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (response.ok) {
                alert("Product added successfully");
                setproductName("");
                setPrice("");
                setCategory([]);
                setBestSeller(false);
                setImage(null);
                setDescription("");
            } else {
                console.error(data.message);
                alert("Failed to add product");
            }
        } else {
            const text = await response.text();
            console.error("Response is not JSON:", text);
            alert("Failed to add product: Response is not in JSON format");
        }
    } catch (error) {
        console.error("Error while adding product:", error);
        alert("Failed to add product");
    }
};

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
            <label>ProductName</label>
            <input type="text" value={productName} onChange={(e)=>setproductName(e.target.value)} />
            <label>Price</label>
            <input type="text"  value={price} onChange={(e)=>setPrice(e.target.value)} />
            <div className="checkinp">
              <label>Category</label>
             <div className="inputscontainer">
             <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
              </div>
             </div>
            </div>
            <div className="inputContainer">
            <label id="bestseller">BestSeller</label>
            <div className="checkboxContainer">
            <label id="yes">Yes</label>
            <input type="radio" value="true" onChange={handleBestSeller} checked={bestSeller===true} />
            </div>
            <div className="checkboxContainer">
            <label id="yes">No</label>
            <input type="radio" value="false" onChange={handleBestSeller} checked={bestSeller===false}/>
            </div>
            </div>
            <label>Description</label>
            <input type="text" onChange={(e)=>setDescription(e.target.value)}  />
            <label>Product Image</label>
            <input type="file" onChange={handleImageUpload} /><br/>
            <div className="btnSubmit">
            <button type="submit">Submit</button>
            </div>
        </form>
        
        </div>
  )
}

export default AddProduct