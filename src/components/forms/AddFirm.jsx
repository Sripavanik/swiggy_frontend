import React,{useState} from 'react'
import {API_URL} from '../../data/ApiPath';
const AddFirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage)
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
  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !==value))
    }
    else{
       setRegion([...region,value])
    }
  }
  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try{
      const loginToken=localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("User not authenticated");
      }
      const formData=new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      category.forEach((value)=>{
        formData.append('category',value)
      });
      region.forEach((value)=>{
        formData.append('region',value)
      })
      const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'Authorization':`Bearer ${loginToken}`
        },
        body:formData
      });
      const data=await response.json();
      if(response.ok){
        console.log(data);
        alert("firm added successfully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }
      else if(data.message==="Vendor can have only one firm"){
        alert("Firm existed.Only 1 firm can be added")
      }
      else{
        alert("failed to add  firm");
      }
      console.log(data.firmId);
      const firmId=data.firmId;
      localStorage.setItem('firmId',firmId)
    }
    catch(error){
      console.error("failed to add firm");
    }
  }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>FirmName</label>
            <input type="text" name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)} />
            <label>Area</label>
            <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)} />
            {/*<label>Category</label>
            <input type="text"  />*/}
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
            {/*<label>Region</label>
           <input type="text"  />*/}
           <div className="checkinp">
              <label>Region</label>
             <div className="inputscontainer">
             <div className="checkboxContainer">
                <label>SouthIndian</label>
                <input type="checkbox" checked={region.includes('south-india')} onChange={handleRegionChange} value="south-india" />
              </div>
              <div className="checkboxContainer">
                <label>North Indian</label>
                <input type="checkbox" checked={region.includes('north-india')} onChange={handleRegionChange} value="north-india" />
              </div>
              <div className="checkboxContainer">
                <label>Chineese</label>
                <input type="checkbox" checked={region.includes('chineese')} onChange={handleRegionChange} value="chineese" />
              </div>
              <div className="checkboxContainer">
                <label>Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')} onChange={handleRegionChange} value="bakery" />
              </div>
             </div>
            </div>
            <label>Offer</label>
            <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)} />
            <label>Firm Image</label>
            <input type="file"  onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
            <button type="submit">Submit</button>
            </div>
        </form>
        
        </div>
  )
}

export default AddFirm;