import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./loading";


export default function Products() {

    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // function to get data from server
    let getProduct = async () => {
        
        let products = await axios.get("https://60efffc1f587af00179d3c21.mockapi.io/products");
        console.log(products.data);
        setProductList([...products.data]);
        setIsLoading(false);
    }

    useEffect(async () => {
        try {
            getProduct()
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [])

    let handleDelete = async (id) => {
        
        let confirm = window.confirm("Do you want to delete it really");
        if (confirm) {
            try {
                
                let delproduct = await axios.delete(`https://60efffc1f587af00179d3c21.mockapi.io/products/${id}`)//deleting data in DOM
                console.log(delproduct.data);
                //deleting in virtual DOM
                let productIndex = productList.findIndex((obj)=>obj.id==id); //find index using id
                productList.splice(productIndex,1);//delete index data using splice
                setProductList([...productList]);//updating the productList
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    return (
        <>
            <h1 class="h3 mb-2 text-gray-800">Products</h1>
            <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                For more information about DataTables, please visit the <a target="_blank"
                    href="https://datatables.net">official DataTables documentation</a>.</p>

            <Link to="/create-product" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i>Create Product</Link>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        {
                            isLoading ?
                                <Loading></Loading>
                                :
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Product Name</th>
                                            <th>Product price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Product Name</th>
                                            <th>Product price</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            productList.map((obj,index) => {
                                                return (
                                                    <tr key={index+1}>
                                                        <td>{index+1}</td>
                                                        <td>{obj.productName}</td>
                                                        <td>{obj.productPrice}</td>
                                                        <td>
                                                            <Link to={`/product/edit/${obj.id}`} className="btn btn-sm btn-primary">Edit</Link> &nbsp;
                                                            <button onClick={() => { handleDelete(obj.id) }} className="btn btn-sm btn-danger">Delete</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </div>
            </div>
        </>

    );
}