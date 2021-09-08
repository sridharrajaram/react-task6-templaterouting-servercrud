import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';


function CreateProduct(props) {

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory(); //calling useHistory function for redirection to other component

    let handleSubmit = async (e) => {
        e.preventDefault();//prevant default will stop auto submitting the form

        try {
            setIsLoading(true);
            let productData = { productName, productPrice }; //destructured way of obj declaration only if keys should match object variable
            let products = await axios.post("https://60efffc1f587af00179d3c21.mockapi.io/products", productData);
            console.log(products.data);


        } catch (error) {
            console.log(error);
            setIsLoading(true);
        }

        isLoading ? <Loading></Loading> : history.push("/product"); //redirection command to users component
    }


    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create Products</h1>
            </div>

            <div className="container">
                
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 mt-2">
                                <label>Product Name</label>
                                <input type="text" name="productName" value={productName} onChange={(e) => { setProductName(e.target.value) }} className="form-control" />
                                
                            </div>
                            <div className="col-lg-6 mt-2">
                                <label>Product Price</label>
                                <input type="text" name="productPrice" value={productPrice} onChange={(e) => { setProductPrice(e.target.value) }} className="form-control" />
                            </div>
                            <div className="col-lg-12 mt-2">
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </div>
                        </div>
                    </form>
                
            </div>
        </div>
    )
}

export default CreateProduct