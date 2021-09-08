import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';


function EditProduct(props) {

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const [isLoading, setIsLoading] = useState(false); //display loading


    const history = useHistory(); //calling useHistory function for redirection to other component

    useEffect(() => {
        //this code will executed when it entered into this component
        //we have product id, get product data by id and populate in form
        async function fetch() {
            let productData = await axios.get(`https://60efffc1f587af00179d3c21.mockapi.io/products/${props.match.params.id}`)
            setProductName(productData.data.productName);
            setProductPrice(productData.data.productPrice);
        }
        fetch();

    }, [])

    let handleSubmit = async (e) => {
        e.preventDefault();//prevant default will stop auto submitting the form

        try {
            setIsLoading(true);
            let productData = { productName, productPrice }; //destructured way of obj declaration only if keys should match object variable
            let products = await axios.put(`https://60efffc1f587af00179d3c21.mockapi.io/products/${props.match.params.id}`, productData)
            console.log(products.data);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }

        isLoading ? <Loading></Loading> : history.push("/product") //redirection command to users component
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
                            <input type="text" value={productName} onChange={(e) => { setProductName(e.target.value) }} className="form-control" />
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Product Price</label>
                            <input type="text" value={productPrice} onChange={(e) => { setProductPrice(e.target.value) }} className="form-control" />
                        </div>
                        <div className="col-lg-12 mt-2">
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct
