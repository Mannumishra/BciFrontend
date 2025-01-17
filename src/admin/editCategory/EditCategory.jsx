import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const {id} = useParams()
    const [formData,setData] = useState({
        categoryName: '',
        categoryImage:''
      })
    
      const handleChange=(event,index)=>{
        const {name,value} = event.target;
        setData(prevData =>({ 
          ...prevData,
          [name]:value
        }))
      }
    const handleFetch = async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-category`);
            // console.log(res.data.data)
            const product = res.data.data
            const fillterProduct = product.filter((item)=> item._id === id)
            // console.log(fillterProduct)
            setData({
                categoryName: fillterProduct[0].categoryName,
                categoryImage: fillterProduct[0].categoryImage
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try { 
            const submitResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/update-category/${id}`,formData);
            console.log(submitResponse)
            toast.success("Category Updated Successfully")
            window.location.href='/all-category'
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }
    
  useEffect(()=>{
      handleFetch()
  },[id])
  return (
    <>
        <ToastContainer />
        <section className="breadCmb">
            <div>
                <h2>Edit Category</h2>
                <ul>
                    <li><Link to="/admin/dashboard">Home / </Link></li>
                    <li><a href="/all-category">Our Category / </a></li>
                    <li>Edit category</li>
                </ul>
            </div>
            <div className="btn1">
                
            </div>
        </section>

        <section className="forms">
          <div className="container">
            <form className="row" onSubmit={handleSubmit}>
              
                <div className="col-md-4">
                  <label for="product-name" className="form-label">Category Name</label>
                  <input required type="text" onChange={handleChange} name='categoryName' value={formData.categoryName} className="form-control" id='product-name' placeholder="Category name" aria-label="Product name" />
                </div>
                <div className="col-md-4">
                  <label for="product-img" className="form-label">Category Name</label>
                  <input required type="text" onChange={handleChange} name='categoryImage' value={formData.categoryImage} className="form-control" id='product-img' placeholder="Category Image" aria-label="Category Image" />
                </div>
                
                <div className="col-md-12 text-center">
                  <input type="reset" className='btn btn-warning text-white'  /> &nbsp;
                  <input type="submit" className='btn btn-success'  value="Save Category Changes" />
                </div>
              
            </form>
          </div>
        </section>
    </>
  )
}

export default EditCategory