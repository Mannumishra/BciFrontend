import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProductPage = () => {
    const [products, setproduct] = useState([]);

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-product`);
            setproduct(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleFetch();
    }, [])
    const hadndleDelete = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-product/${id}`);
            toast.success("Product Deleted Successfully")
            console.log(res.data)
            handleFetch()
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }
    // console.log(products)
    return (
        <>
            <ToastContainer />
            <section className="breadCmb">
                <div>
                    <h2>Our Products</h2>
                    <ul>
                        <li><Link to="/admin/dashboard">Home / </Link></li>
                        <li>Our Products</li>
                    </ul>
                </div>
                <div className="btn1">
                    <Link to={'/create-product'} >Create Product </Link>
                </div>
            </section>

            <section className="tables">
                <div className="container overflow-auto">
                    <div className="row">
                        <table className="table table-bordered" style={{minWidth:'800px'}}>
                            <thead>
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product Images</th>
                                    <th scope="col">Sizes</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {products && products.reverse().map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.categoryName}</td>
                                        <td>{item.productName}</td>
                                        <td>
                                            {item.productImage.map((image, idx) => (
                                                image && <img key={idx} src={image} alt={`Product-image-${idx}`} style={{ marginRight: '10px', width: '50px' }} />
                                            ))}
                                        </td>
                                        <td>{item.sizes}</td>
                                        <td className="upd-btns">
                                            <Link to={`/edit-product/${item._id}`} className="upd-btns update"><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <button onClick={() => hadndleDelete(item._id)} className="upd-btns delete"><i className="fa-solid fa-trash-arrow-up"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminProductPage